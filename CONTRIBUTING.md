# Contributing

The website source code is public for viewing and reuse. Edits, commits, CMS access, reviews, and production deployments are limited to authorized IEEE NUCES PWR Web Development or Technical Team members. Access is granted by the launch team.

## Website Team Work

- Fix typos or outdated branch information
- Add event summaries and photos
- Improve image alt text
- Compress or replace oversized media
- Improve responsive layout or accessibility
- Fix broken links caught by `npm test`

## Local Setup

```bash
npm install
npm start
```

Run checks before requesting, applying, or publishing a change:

```bash
npm test
```

## CMS Content Edits

The shared website content is stored in `data/site-data.json`. Authorized Web Development or Technical Team members can edit it directly or use `/admin/` after CMS authentication is configured. Anyone outside those teams should first join the society and be approved through the branch process before requesting edit access.

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
