# IEEE NUCES PWR Student Branch Website

Official website for IEEE NUCES PWR Student Branch at FAST NUCES Peshawar.

Built by Rayyan Shaheer. The source code is public, and direct write access, CMS access, reviews, and production deployments are managed by authorized IEEE NUCES PWR society maintainers.

## Tech Stack

- Static HTML, CSS, and JavaScript
- GitHub Pages hosting
- Decap CMS for content editing
- Node.js scripts for local preview and link checks

## Local Development

Install dependencies and start the local server:

```bash
npm install
npm start
```

Open `http://localhost:5500`.

Run checks before publishing changes:

```bash
npm test
```

## Project Structure

```text
index.html              Main app shell
404.html                Fallback page
styles.css              Site styles
assets/js/site-shell.js Header and footer
assets/js/site.js       Page rendering and interactions
admin/                  CMS admin
assets/                 Images, icons, and event media
data/site-data.json     Shared branch content
scripts/                Local maintenance scripts
```

## Updating Content

Most branch content lives in `data/site-data.json` and can also be edited from `/admin/` after CMS access is configured.

Common updates:

- Add or update events, teams, leaders, members, and learning tracks.
- Add event photos under `assets/events/`.
- Add team and member photos under the matching `assets/` folders.
- Keep image filenames readable and compress large files before committing.

After changing routes or event entries, run:

```bash
npm run sync-routes
npm test
```

## Deployment

GitHub Pages publishes the site from the `main` branch. Keep `CNAME` set to `pwr.ieeenuces.org`.

This repo is the canonical website repo for the branch. Keep future website work here instead of splitting updates across duplicate repositories.

## Contributing

Public contributors can propose improvements through the repository workflow. Direct write access, CMS access, reviews, and production deployments are limited to authorized IEEE NUCES PWR society maintainers. Read `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` before requesting or applying website changes.

Built by Rayyan Shaheer. IEEE names, logos, and marks remain subject to IEEE brand and trademark rules.
