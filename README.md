# ProfessionalLifeBoosterWithPVI meetup page

A single static page (`index.html`) for GitHub Pages. No build step — this is
plain HTML/CSS, so nothing here affects what gets deployed. The dev server
below is only for previewing changes locally.

## Local development

Requires [Node.js](https://nodejs.org) (any recent version).

```bash
npm install
npm run dev
```

This opens `http://localhost:5500` in your browser and refreshes it
automatically whenever you save `index.html`.

## Deploying

Nothing to build. Push `index.html` to your repo and enable GitHub Pages in
Settings → Pages, pointing at the branch/folder containing it. `package.json`,
`.gitignore`, and this README are dev-only — GitHub Pages ignores them.