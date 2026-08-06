## Content Sync System - Testing Guide

This project uses an automated sync system to keep `index.html` and `translations.js` in sync.

### How it works:

1. **Single source of truth**: Edit only `translations.js`
2. **Automatic sync**: Running `npm run dev` automatically syncs before starting the server
3. **Manual sync**: Run `npm run sync` anytime to update HTML from translations

### Quick test:

1. Edit a translation in `translations.js` (e.g., change `eyebrow` value)
2. Run `npm run sync`
3. Check `index.html` - the HTML fallback text should now match your change
4. Run `npm run dev` - both the fallback AND the JavaScript-loaded text will show your change

### Why this matters:

- ✅ **Maintainable**: Edit content in only ONE place
- ✅ **SEO-friendly**: HTML has proper fallback content for search engines
- ✅ **Accessible**: Content loads even without JavaScript
- ✅ **No duplication**: Sync script eliminates manual copying

### Files:

- `translations.js` - **Edit this** for content changes
- `index.html` - Auto-updated by sync script (don't edit content directly)
- `sync-content.js` - The sync automation script
- `package.json` - Contains `sync` and `dev` commands
