# Atul Swain — Portfolio

A minimal, single-page portfolio: about, journey, selected work, data science, education and contact.
Plain HTML, CSS and JavaScript — no build step. Light and dark themes, responsive down to phone width.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Publish on GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → pick the branch and `/ (root)`.

## Filling in the placeholders

Search `index.html` for these comments:

- `DATA SCIENCE CASE STUDY` — title, question, data, methods and result of the featured project.
- `EDUCATION` — degree, institution and years.
- `Add LinkedIn here` — uncomment and add your profile link.

## Files

- `index.html` — all content
- `styles.css` — design tokens (colours, fonts) at the top, then layout
- `script.js` — theme toggle, scroll reveals, active nav link, copy-email button
