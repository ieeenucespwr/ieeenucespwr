# IEEE NUCES PWR Student Branch Website

Canonical static website for IEEE NUCES PWR Student Branch at FAST NUCES Peshawar.

Built by Rayyan Shaheer.

This repository consolidates the previous website repos into one maintainable, open-source project:

- `rayyanshaheer/ieee-new-website2`
- `rayyanshaheer/ieee-new-website`
- `rayyanshaheer/website-ieeenucespwr`

## Tech Stack

- Static HTML, CSS, and JavaScript
- GitHub Pages compatible
- No runtime framework or build dependency required
- Local link check with Node.js
- Decap CMS admin for Git-based content editing
- Dark mode with saved user preference and system fallback

## Local Development

```bash
npm install
npm start
```

Open `http://localhost:5500`.

Run checks:

```bash
npm test
```

## Project Structure

```text
.
├── index.html
├── about.html
├── leadership.html
├── events.html
├── courses.html
├── open-source.html
├── contact.html
├── styles.css
├── script.js
├── admin/
├── data/site-data.json
├── events-details/
├── assets/
├── scripts/check-links.mjs
└── .github/workflows/pages.yml
```

## Updating Content

Shared page content lives in `data/site-data.json` and can be edited through the Decap CMS admin at `/admin/` after GitHub OAuth is configured.

Common updates:

- Add an event to `events` and place detail pages in `events-details/`
- Add photos under `assets/events/`, `assets/team_photos/`, or `assets/courses/`
- Update leadership, teams, and learning tracks in the CMS or the JSON data file
- Keep image filenames readable and avoid replacing existing images unless intentional

See `docs/cms.md` for CMS authentication and open-authoring setup.

After changing links or pages, run:

```bash
npm test
```

## Deployment

The repository includes a GitHub Pages workflow at `.github/workflows/pages.yml`.

Recommended settings:

1. Keep `CNAME` as `pwr.ieeenuces.org`.
2. In GitHub repository settings, configure Pages source as GitHub Actions.
3. Push to `main`.

## Open Source Notes

The source code is MIT licensed. IEEE names, logos, and marks are governed by IEEE brand and trademark rules and are not relicensed by this repository.

See `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` before contributing.
