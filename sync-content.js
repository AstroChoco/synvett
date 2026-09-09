#!/usr/bin/env node

/**
 * Sync content from translations.js into index.html
 * 
 * This script reads the Swedish translations (default language) from translations.js
 * and updates all the fallback text in index.html to match.
 * 
 * This ensures:
 * - translations.js is the single source of truth
 * - HTML has proper fallback content for SEO and accessibility
 * - No manual duplication needed
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read the translations file
const translationsPath = path.join(__dirname, 'translations.js');
const translationsContent = fs.readFileSync(translationsPath, 'utf-8');

// Extract the translations object by evaluating it in a safe context
let translations;
try {
  // Create a context with an empty object to hold our result
  const sandbox = { result: null };
  const context = vm.createContext(sandbox);
  
  // Add code to capture the translations constant
  const codeWithCapture = translationsContent + '\nresult = translations;';
  vm.runInContext(codeWithCapture, context);
  
  translations = sandbox.result;
} catch (error) {
  console.error('Error parsing translations.js:', error.message);
  process.exit(1);
}

if (!translations || !translations.sv) {
  console.error('Could not find Swedish translations in translations.js');
  process.exit(1);
}

const sv = translations.sv;

// Read the HTML file
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Function to escape HTML entities
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Function to update data-i18n elements  
function updateDataI18nElement(htmlContent, key, value) {
  // Match data-i18n="key" attribute and replace content up to the closing tag
  // This handles: <tag data-i18n="key">content</tag> or <tag data-i18n="key" ...>content</tag>
  
  // For HTML content (like footerContact, footerAccessibility), don't escape
  const shouldEscapeHtml = !['footerContact', 'footerAccessibility'].includes(key);
  const newValue = shouldEscapeHtml ? escapeHtml(value) : value;
  
  // Find the element with this data-i18n attribute
  const attrRegex = new RegExp(`<([a-z][a-z0-9]*)([^>]*data-i18n="${key}"[^>]*)>([\\s\\S]*?)<\\/\\1>`, 'i');
  const match = htmlContent.match(attrRegex);
  
  if (match) {
    const [fullMatch, tagName, attributes, oldContent] = match;
    const replacement = `<${tagName}${attributes}>${newValue}</${tagName}>`;
    return htmlContent.replace(fullMatch, replacement);
  }
  
  return htmlContent;
}

// Update all translations in the HTML
let updatedCount = 0;
const updatedKeys = [];
for (const [key, value] of Object.entries(sv)) {
  const before = html;
  html = updateDataI18nElement(html, key, value);
  if (html !== before) {
    updatedCount++;
    updatedKeys.push(key);
  }
}

// Sync href attributes: for any element with data-i18n-href="key", update its href.
// The signupLink uses id="signupLink" with the URL stored under the 'signupUrl' key.
function updateHrefAttribute(htmlContent, id, url) {
  return htmlContent.replace(
    new RegExp(`(id="${id}"[^>]*\\shref=")[^"]*(")`, 'g'),
    `$1${url}$2`
  );
}

if (sv.signupUrl) {
  const before = html;
  html = updateHrefAttribute(html, 'signupLink', sv.signupUrl);
  if (html !== before) {
    updatedCount++;
    updatedKeys.push('signupLink[href]');
  }
}

// Write the updated HTML back
fs.writeFileSync(htmlPath, html, 'utf-8');

console.log(`✓ Synced ${updatedCount} translation(s) from translations.js to index.html`);
if (updatedKeys.length > 0) {
  console.log(`  Updated: ${updatedKeys.join(', ')}`);
}
console.log('  HTML fallback content is now up to date with Swedish translations.');
