# CMS Setup

This site uses Decap CMS to edit shared branch content stored in `data/site-data.json`.

The admin page is available at:

```text
https://pwr.ieeenuces.org/admin/
```

## What Editors Can Change

Editors can update:

- Faculty and executive body information
- Working teams and member records
- Event archive entries
- Learning tracks
- Uploaded media in `assets/uploads/`

## Access

CMS access depends on GitHub authentication configured in `admin/config.yml`. Keep OAuth secrets outside this repository.

External CMS submissions should use the editorial workflow so maintainers can review changes before publishing.

## Local Editing

For normal local work, edit `data/site-data.json` directly and run:

```bash
npm test
```

To preview the site locally:

```bash
npm start
```

## Adding Events

1. Add the event entry in the CMS or `data/site-data.json`.
2. Add event photos under `assets/events/` or `assets/uploads/`.
3. Run `npm run sync-routes` if a new event route was added.
4. Run `npm test`.
