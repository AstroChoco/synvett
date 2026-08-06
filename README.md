# nav-self-growth-together

A single static page (`index.html`) for GitHub Pages. No build step — this is
plain HTML/CSS, so nothing here affects what gets deployed. The dev server
below is only for previewing changes locally.

**Repository:** [nav-self-growth-together](https://github.com/AstroChoco/nav-self-growth-together)

## Local development

Requires [Node.js](https://nodejs.org) (any recent version).

```bash
npm install
npm run dev
```

This opens `http://localhost:5500` in your browser and refreshes it
automatically whenever you save `index.html`.

## Editing content

**To change the text content on the page, edit `translations.js`** — this is your single source of truth.

The page supports both Swedish (sv) and English (en) with a language toggle.
All text content is stored in the `translations` object in `translations.js`:

- Edit the `sv` section for Swedish text
- Edit the `en` section for English text

When you run `npm run dev`, the Swedish translations are automatically synced into
`index.html` as fallback content (for SEO, accessibility, and users without JavaScript).
**You never need to edit the HTML content directly** — it's auto-generated from `translations.js`.

### Manual sync

If you need to sync translations without starting the dev server:

```bash
npm run sync
```

This updates the HTML fallback content to match your Swedish translations.

## Deploying

Nothing to build. Push `index.html`, `translations.js`, and `style.css` to your 
repo and enable GitHub Pages in Settings → Pages, pointing at the branch/folder 
containing them. `package.json`, `.gitignore`, and this README are dev-only — 
GitHub Pages ignores them.