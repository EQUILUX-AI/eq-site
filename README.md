# eq-site

Equilux AI marketing site (port of the Google Sites page). Astro + Keystatic, deployed on Vercel.

- Pages are prerendered static HTML.
- Content lives in the repo: `src/content/*.yaml` (Home, Get Started, Site settings) and `src/content/tips/*.mdoc` (Energy Tips). Images in `public/images/`.
- Editing UI at `/keystatic`. Locally it writes to disk; in production it commits to GitHub (`andrewfam-eqai/eq-site`), which triggers a Vercel redeploy.

## Develop

```sh
npm install
npm run dev        # http://127.0.0.1:4321, editor at /keystatic
npm run build
```

## Production editing setup (one-time)

1. Push this repo to `github.com/andrewfam-eqai/eq-site` and import it into Vercel.
2. Run the site locally with `npm run build && npm run preview`, or deploy, and open `/keystatic` — Keystatic walks you through creating a GitHub App and prints the env vars.
3. Add them to the Vercel project: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
4. Editors need write access to the repo; they sign in at `https://<domain>/keystatic` with GitHub.

## Forms

"Get Started" embeds the existing Google Form (URL editable in Keystatic), so responses keep going to the same Google Sheet.
