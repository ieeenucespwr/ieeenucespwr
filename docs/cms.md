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

1. **Generate a GitHub Personal Access Token**:
   - Go to [GitHub Token Settings (classic)](https://github.com/settings/tokens/new?scopes=repo&description=IEEE+NUCES+PWR+CMS).
   - Give the token a name (e.g. `IEEE NUCES PWR CMS`).
   - Select the **`repo`** scope (Full control of private and public repositories).
   - Generate and copy the token (`ghp_...`).
2. **Log into the CMS**:
   - Visit `https://pwr.ieeenuces.org/admin/`.
   - Click the **"🔑 GitHub Token Login"** button at the bottom-right.
   - Paste your token and click **"Save & Log In"**.
   - The CMS will load and authenticate directly against the GitHub repository.

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
