# IEEE NUCES PWR Student Branch Website

Official website for IEEE NUCES PWR Student Branch at FAST NUCES Peshawar.

Built by Rayyan Shaheer. The source code is public for viewing and reuse, while edits, commits, CMS access, reviews, and production deployments are limited to authorized IEEE NUCES PWR Web Development or Technical Team members. Access is granted by the launch team.

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

To run the local CMS backend proxy for zero-config editing:

```bash
npm run cms
```

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
admin/                  Decap CMS admin with GitHub Token login
assets/                 Images, icons, and event media
data/site-data.json     Shared branch content
docs/cms.md             CMS setup & authentication guide
scripts/                Local maintenance scripts
```

## Updating Content

Most branch content lives in `data/site-data.json` and can be edited directly or through Decap CMS at `/admin/`:

- **Production CMS**: Visit `https://pwr.ieeenuces.org/admin/` and log in with your GitHub Personal Access Token (PAT with `repo` scope). See [`docs/cms.md`](docs/cms.md) for full instructions.
- **Local CMS**: Run `npm run cms` alongside `npm start` and visit `http://localhost:5500/admin/`.

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

The public repository can be viewed or reused, but commit access is restricted to authorized IEEE NUCES PWR Web Development or Technical Team members. Anyone seeking edit access should first join the society and be approved through the branch process. Read `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` before requesting or applying website changes.

Built by Rayyan Shaheer. IEEE names, logos, and marks remain subject to IEEE brand and trademark rules.
