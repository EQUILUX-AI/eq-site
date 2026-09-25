# eq-site

Equilux AI marketing site (port of the Google Sites page). Astro + Keystatic, deployed on Vercel.

- Pages are prerendered static HTML.
- Content lives in the repo: `src/content/*.yaml` (Home, Get Started, Site settings) and `src/content/tips/*.mdoc` (Energy Tips). Images in `public/images/`.
- Editing UI at `/keystatic`. Locally it writes to disk; in production it commits to GitHub (`EQUILUX-AI/eq-site`), which triggers a Vercel redeploy.

## Develop

```sh
npm install
npm run dev        # http://127.0.0.1:4321, editor at /keystatic
npm run build
```

## Production editing setup (one-time)

The deployed `/api/keystatic` routes return 500 until the env vars below are set.

1. Create a GitHub App at github.com/settings/apps/new:
   - Homepage URL: `https://<domain>`
   - Callback URL: `https://<domain>/api/keystatic/github/oauth/callback`
   - Check "Request user authorization (OAuth) during installation"; uncheck Webhook "Active"
   - Repository permissions: Contents **Read and write**, Metadata **Read-only**, Pull requests **Read-only**
2. On the app page: note the Client ID, generate a client secret, then "Install App" on `EQUILUX-AI/eq-site`.
3. In Vercel → Project → Settings → Environment Variables (Production), set:
   - `KEYSTATIC_GITHUB_CLIENT_ID` — the Client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET` — the client secret
   - `KEYSTATIC_SECRET` — any random string, e.g. `openssl rand -hex 32`
   - `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — the app's slug (from its URL, github.com/apps/<slug>)
4. Redeploy (`PUBLIC_*` is inlined at build time).
5. Editors need write access to the repo; they sign in at `https://<domain>/keystatic` with GitHub.

`<domain>` must be the stable production domain (e.g. `equilux-ai.com` or the project's `*.vercel.app` alias), not a per-deployment `eq-site-<hash>-…vercel.app` URL.

## Forms

"Get Started" embeds the existing Google Form (URL editable in Keystatic), so responses keep going to the same Google Sheet.
