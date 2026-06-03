# CMS Setup

This website uses Decap CMS as a Git-based editor for the shared branch content. The CMS writes to the repository instead of storing content in a separate database.

## What editors can change

The CMS edits `data/site-data.json`, which powers the faculty panel, executive leaders, operating teams, event archive, and learning tracks. Uploaded media is stored in `assets/uploads/`.

The admin UI lives at:

```text
https://pwr.ieeenuces.org/admin/
```

## Authentication

The CMS is configured for the GitHub backend in `admin/config.yml`:

- Repository: `rayyanshaheer/ieee-new-website`
- Branch: `main`
- Editorial workflow: enabled
- Open authoring: enabled, so external GitHub users can submit CMS edits as pull requests

GitHub authentication requires an OAuth proxy when the site is hosted on GitHub Pages. Configure a GitHub OAuth application and deploy an OAuth handler, then set these values in `admin/config.yml`:

```yaml
backend:
  name: github
  repo: rayyanshaheer/ieee-new-website
  branch: main
  open_authoring: true
  base_url: https://your-decap-oauth-proxy.example.com
  auth_endpoint: auth
```

Do not commit OAuth client secrets to this repository. Keep them in the OAuth proxy environment.

## Local editing

For normal local development, edit `data/site-data.json` directly and run:

```bash
npm test
```

To use Decap's local proxy workflow, install and run a Decap local backend separately, temporarily add `local_backend: true` to `admin/config.yml`, then open `http://localhost:5500/admin/` while `npm start` is running.

## Adding new events

1. Add the event entry in the CMS or in `data/site-data.json`.
2. Create the matching detail page in `events-details/`.
3. Upload or add event images under `assets/events/` or `assets/uploads/`.
4. Run `npm test` to catch missing pages, images, or local links.
