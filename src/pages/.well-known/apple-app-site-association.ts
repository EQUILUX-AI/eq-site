import type { APIRoute } from 'astro';

// iOS Universal Links for the Equilux app. Only /app/oauth-return opens the app
// (eq-hub's Tesla sign-in hands the user back here, params in the #fragment);
// every other /app link, e.g. ChottuLink's /app?page=…, keeps opening in the
// browser. Served by a function so it gets the application/json type Apple
// requires; a file without an extension in public/ would not.
export const prerender = false;

const APP_IDS = ['QGN85H2S3W.com.equilux.client', 'QGN85H2S3W.com.equilux.client.dev'];

const body = {
  applinks: {
    details: [
      {
        appIDs: APP_IDS,
        components: [{ '/': '/app/oauth-return', comment: 'Provider sign-in return' }],
      },
    ],
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  });
