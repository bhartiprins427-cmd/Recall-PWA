# Recall PWA

## Included
- `index.html`: your existing Recall app, with install metadata added.
- `manifest.json`: app name, display mode, colors, and icons.
- `sw.js`: service worker for offline app-shell caching.
- `icons/`: 192px and 512px app icons.

## Run locally
A PWA must be served from `localhost` or HTTPS; opening `index.html` directly as a `file://` page will not install the service worker.

For example, from this folder:
    python -m http.server 8000

Then open:
    http://localhost:8000

## Deploy
Upload the contents of this folder to a static HTTPS host such as GitHub Pages, Netlify, or Vercel. Open the deployed URL in Chrome on Android and choose **Install app** or **Add to Home screen**.

## Important data note
Recall currently stores its decks, cards, and review history in browser `localStorage` under `recall.v1`. The service worker does not erase that data, but browser storage is tied to the site origin and browser profile. Export a JSON backup from Recall's Profile screen before moving to a different domain or clearing browser data.

## Offline note
The app shell is cached for offline launch. Google Fonts is external and may not load offline; the system font fallback will be used. Any future external assets or API calls may need their own offline strategy.
