// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // Pages are prerendered; only /keystatic and /api/keystatic run as functions.
  output: 'static',
  integrations: [react(), markdoc(), keystatic()],
  adapter: vercel()
});
