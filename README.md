# IEEE NUCES PWR Student Branch Website

Canonical website application for IEEE NUCES PWR Student Branch at FAST NUCES Peshawar.

Built by Rayyan Shaheer.

This repository consolidates the previous website repos into one maintainable, open-source project:

- `rayyanshaheer/ieee-new-website2`
- `rayyanshaheer/ieee-new-website`
- `rayyanshaheer/website-ieeenucespwr`

## Tech Stack

- Static HTML, CSS, and JavaScript
- App-style client-side routing with GitHub Pages fallback
- GitHub Pages compatible
- No runtime framework or build dependency required
- Local route and link check with Node.js
- Decap CMS admin for Git-based content editing
- Dark mode with saved user preference and system fallback

## Local Development

```bash
npm install
npm start
```

Open `http://localhost:5500`. The local Node server serves static assets and falls back to the app shell for clean routes like `/about` and `/events/gender-equality-sep2024`. Production clean routes are backed by generated app shell files. `404.html` remains the fallback for unknown routes.

Run checks:

```bash
npm test
```

## Project Structure

```text
.
|-- index.html              # App shell
|-- 404.html                # GitHub Pages route fallback
|-- styles.css              # Shared visual system and routed views
|-- assets/js/site-shell.js # Header/footer shell
|-- assets/js/site.js       # Router, views, renderers, interactions
|-- admin/                  # Decap CMS admin
|-- data/site-data.json     # CMS-editable shared content
|-- assets/                 # Images, icons, event media
|-- scripts/check-links.mjs # Static route/link validation
|-- sitemap.xml
|-- CNAME
```

## Updating Content

Shared website content lives in `data/site-data.json` and can be edited through the Decap CMS admin at `/admin/` after GitHub OAuth is configured. Public pages are routed views rendered from `assets/js/site.js`, so contributors should not add standalone HTML files for normal website pages.

Common updates:

- Add an event to `events` with a route like `/events/event-name`
- Add photos under `assets/events/`, `assets/team_photos/`, or `assets/courses/`
- Update leadership, teams, and learning tracks in the CMS or the JSON data file
- Keep image filenames readable and avoid replacing existing images unless intentional

See `docs/cms.md` for CMS authentication and open-authoring setup.

After changing event routes, sync route shells and run checks:

```bash
npm run sync-routes
npm test
```

## Deployment

GitHub Pages publishes from `main` at the repository root.

Recommended settings:

1. Keep `CNAME` as `pwr.ieeenuces.org`.
2. In GitHub repository settings, configure Pages source as `main` and path `/`.
3. Push to `main`.

## Open Source Notes

The source code is MIT licensed. IEEE names, logos, and marks are governed by IEEE brand and trademark rules and are not relicensed by this repository.

See `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` before contributing.
