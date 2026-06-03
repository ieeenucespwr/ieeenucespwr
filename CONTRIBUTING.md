# Contributing

Thanks for helping maintain the IEEE NUCES PWR website.

## Good First Contributions

- Fix typos or outdated branch information
- Add event summaries and detail pages
- Improve image alt text
- Compress or replace oversized media
- Improve responsive layout or accessibility
- Fix broken links caught by `npm test`

## Local Setup

```bash
npm install
npm start
```

Run checks before opening a pull request:

```bash
npm test
```

## CMS Content Edits

The shared website content is stored in `data/site-data.json`. Maintainers can edit it directly or use `/admin/` after CMS authentication is configured. External contributors using the CMS should submit changes through the editorial workflow so maintainers can review the generated pull request.

## Content Guidelines

- Keep event summaries factual and specific.
- Use real dates and event names.
- Add meaningful alt text for every image.
- Do not commit private phone numbers, private emails, or student data without consent.
- Keep large images compressed before committing.

## Pull Request Checklist

- The change has a clear title and description.
- `npm test` passes.
- New links point to existing pages or trusted external URLs.
- New images are placed in the correct `assets/` folder.
- Public names, photos, and roles have permission to be published.

## Branch Naming

Use short branch names:

- `content/add-devops-report`
- `fix/mobile-nav`
- `design/events-section`
- `docs/update-readme`
