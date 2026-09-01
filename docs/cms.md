# CMS Setup

This site uses Decap CMS to manage branch content stored in `data/site-data.json`.

The admin interface is available at:

```text
https://pwr.ieeenuces.org/admin/
```

---

## Authentication & Login Options

### Option 1: GitHub Personal Access Token (PAT) in Production (Recommended)

Authorized team members can log into the live CMS directly using a GitHub Personal Access Token without needing an external OAuth server:

#### Recommended: Fine-Grained Token (Repository Scoped)
1. Go to [GitHub Fine-Grained Token Settings](https://github.com/settings/personal-access-tokens/new).
2. Set token name (e.g. `IEEE NUCES PWR CMS`) and expiration.
3. Under **Repository access**, choose **Only select repositories** and select `ieeenucespwr/ieeenucespwr` (or your personal fork).
4. Under **Repository permissions**, grant:
   - **Contents**: `Read and write` (to view and edit site content and images).
   - **Pull requests**: `Read and write` (to manage editorial workflow branches/drafts).
5. Generate and copy the token (`github_pat_...`).

#### Alternative: Classic Token
1. Go to [GitHub Token Settings (classic)](https://github.com/settings/tokens/new?scopes=repo&description=IEEE+NUCES+PWR+CMS).
2. Select the **`repo`** scope (full control over all repositories).
3. Generate and copy the token (`ghp_...`).

#### Log into the CMS:
1. Visit `https://pwr.ieeenuces.org/admin/`.
2. Click the **"🔑 GitHub Token Login"** button at the bottom-right.
3. Paste your token and click **"Save & Log In"**.
4. The CMS will load and authenticate directly against the GitHub repository.

---

### Option 2: Local CMS Development (Offline / Zero-Config)

You can run Decap CMS locally without any remote credentials:

1. In one terminal, start the local CMS backend proxy:
   ```bash
   npm run cms
   ```
2. In another terminal, start the local development server:
   ```bash
   npm start
   ```
3. Open `http://localhost:5500/admin/` in your browser.
4. The CMS will automatically connect to your local repository on disk. Any edits and media uploads are written directly to `data/site-data.json` and `assets/uploads/`.

---

### Option 3: OAuth Proxy (Optional)

If you prefer GitHub OAuth popups over personal access tokens:
1. Deploy an open-source OAuth proxy (such as `decap-cms-github-oauth-provider-cloudflare` on Cloudflare Workers or `netlify-cms-github-oauth-provider` on Vercel).
2. Register a GitHub OAuth App with your proxy's callback URL.
3. In `admin/config.yml`, uncomment and configure:
   ```yaml
   base_url: https://your-decap-oauth-proxy.example.com
   auth_endpoint: auth
   ```

---

## What Editors Can Change

- **Faculty Advisor**: Name, role, research details, profile image, and social links.
- **Executive Leaders**: Executive body members, roles, department, image, bio, and social links.
- **Additional Society Members**: General body, volunteers, and ambassadors.
- **Operating Teams**: Teams (Operations, Marketing, Media, Graphics, Web Dev, Event Coordination, Content Creation, Decor, Safety & Security), lead photos, and team members.
- **Events**: Event titles, dates, event routes, summaries, and cover photos.
- **Learning Tracks**: Course tracks, topics, and descriptions.
- **Media**: Uploaded images stored in `assets/uploads/`.

---

## Publishing Workflow & Route Syncing

1. When editing content, save your changes and publish or submit them through the editorial workflow.
2. If new event routes are added (e.g., `/events/new-event`), run:
   ```bash
   npm run sync-routes
   npm test
   ```
3. Commit and push any changes to the `main` branch to trigger GitHub Pages deployment.
