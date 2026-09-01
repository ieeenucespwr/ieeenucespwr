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

## Branching & Pull Request Workflow

All contributors must strictly follow the promotion pipeline:

```text
[ dev-<name> / feature/* ]  ──(PR)──>  [ main ]  ──(PR)──>  [ prod ]
```

1. **Step 1: Develop on your branch**
   - Work on your dedicated developer branch (e.g., `dev-rayyan`, `dev-fawad`) or a scoped feature branch (`fix/mobile-nav`, `content/new-event`).
   - Commit and push your changes to your branch.

2. **Step 2: Pull Request to `main` (`dev-*` &rarr; `main`)**
   - Open a PR targeting the **`main`** branch.
   - Run `npm test` locally to ensure all link checks and validations pass.
   - Review and merge into `main`.

3. **Step 3: Pull Request to `prod` (`main` &rarr; `prod`)**
   - **DO NOT create PRs directly from `dev-*` to `prod`.**
   - Once changes are merged and verified on `main`, open a Pull Request from **`main` into `prod`** to release changes to production.

## Branch Naming Conventions

Use standardized branch prefixes:

- `dev-<name>` (e.g., `dev-rayyan`, `dev-fawad`)
- `content/<topic>` (e.g., `content/add-devops-report`)
- `fix/<issue>` (e.g., `fix/mobile-nav`)
- `design/<topic>` (e.g., `design/events-section`)
- `docs/<topic>` (e.g., `docs/update-readme`)
