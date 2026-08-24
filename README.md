# VONLOVI — site

Luxury jewelry site inspired by the editorial layout of [Cecilie Bahnsen](https://ceciliebahnsen.com/).

## Structure

| Page | Role |
|------|------|
| `index.html` | Homepage — hero, categories, editorial blocks |
| `archives.html` | Full-bleed infinite image stream |
| `collection.html` | Category grids (`?cat=pendentifs` …) |
| `product.html` | Product detail (`?slug=pendentif-onyx`) |
| `about.html` | About the maison |
| `chrome.css` / `chrome.js` | Corner framing menu (all pages) |

## Assets

Organised from **vonlovi assets 2026** (Spinéa catalog):

```
assets/
  bagues/                  … per-product folders (01.jpg, 02.jpg, …)
  bagues-petit-modele/
  boucles-d-oreilles/
  boutons/
  bracelets/
  pendentifs/
  gallery/                 … intro sketches & UI
  archives/                … Instagram / editorial images for archives page
data/
  catalogue.json           … full product catalog (49 pieces)
  archives.json            … manifest for archives mosaic
  INVENTAIRE.md
```

## Run

```bash
python3 -m http.server 5173
# → http://localhost:5173
```

## Deploy (Vercel)

Static site — no build step. From this folder:

```bash
npx vercel@58.9.0 login
npx vercel@58.9.0          # preview
npx vercel@58.9.0 --prod   # production
```

Live: https://vonlovi.vercel.app

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). `vercel.json` sets clean URLs and long-cache headers for `assets/`.

**Note:** Archives `013–056` may still be iCloud stubs locally (`.*.icloud`). Download them in Finder before deploy if you want the full Archives page online.

## Archives (Instagram)

The @vonlovi profile has ~85 posts. Instagram blocks unauthenticated scraping, so refresh the archive after logging in:

```bash
pip3 install gallery-dl pillow
python3 scripts/fetch-instagram.py --browser chrome
# or: INSTAGRAM_USER=… INSTAGRAM_PASS=… python3 scripts/fetch-instagram.py --login
```

Then open `archives.html`.

## Next steps

- Shop / product pages wired to `data/catalogue.json`
- Cart & checkout
- FR/EN toggle
