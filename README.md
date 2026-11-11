# Niet Pluis! — Mysteries op Het Kompas

A static, multi-page website for GitHub Pages. There is no build step.

## Pages

- `index.html` — home
- `dossiers.html` — dossier archive and filters
- `dossier-001.html` — interactive dossier 001
- `kaarten.html` — people and character cards
- `print.html` — printable dossier archive

Shared site styles and page-specific scripts live in `assets/css/` and
`assets/js/`. Images and the printable PDF are in `assets/images/` and
`assets/docs/`. The original single-file HTML is kept in `_source/`; GitHub
Pages' default Jekyll build excludes that directory from the published site.

## Preview locally

Open `index.html` in a browser, or serve the repository directory with any
local static-file server.

## Publish with GitHub Pages

1. Push the repository to GitHub.
2. Open the repository’s **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/(root)` folder, then save.
5. GitHub Pages will publish the site and show its URL in the Pages settings.

Edit the relevant page in the repository root. Keep `index.html` there so
GitHub Pages uses it as the site’s entry page. Update `assets/css/site.css` for
shared styling and the dossier-specific files for the interactive investigation
table.
