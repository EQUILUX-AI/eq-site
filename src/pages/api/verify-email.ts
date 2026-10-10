import type { APIRoute } from 'astro';

// Runs as a Vercel function: eq-auth's CORS allowlist doesn't include this site.
export const prerender = false;

// Prod and dev eq-auth both link to /app, and only the server that signed a
// key accepts it, so try prod first and fall back to dev.
const AUTH_URLS = ['https://auth.equilux-ai.com', 'https://auth-dev.equilux-ai.com'];

type Result = 'verified' | 'invalid' | 'error';

async function verifyWith(authUrl: string, key: string): Promise<Result> {
  const res = await fetch(`${authUrl}/api/auth/register/verify-email/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  if (res.ok) return 'verified';
  const body = await res.json().catch(() => ({}));
  // Same as eq-client: an already-confirmed email counts as success.
  if (body.error === 'invalidEmailConfirmed') return 'verified';
  if (body.error === 'invalidEmailConfirmKeyInvalid') return 'invalid';
  return 'error';
}

export const POST: APIRoute = async ({ request }) => {
  const { key } = await request.json().catch(() => ({}));
  if (typeof key !== 'string' || !key) {
    return Response.json({ result: 'invalid' }, { status: 400 });
  }

  // An outage on one server shouldn't hide a key the other one accepts.
  let result: Result = 'invalid';
  for (const authUrl of AUTH_URLS) {
    const r = await verifyWith(authUrl, key).catch((): Result => 'error');
    if (r === 'verified') return Response.json({ result: r });
    if (r === 'error') result = 'error';
  }
  return Response.json({ result });
};
