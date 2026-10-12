// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  // Pages are prerendered; only /keystatic and /api/keystatic run as functions.
  output: 'static',
  integrations: [react(), markdoc(), keystatic()],
  adapter: vercel(),
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Sora',
      cssVariable: '--font-sora',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/Sora-Regular.ttf'] },
          { weight: 500, style: 'normal', src: ['./src/assets/fonts/Sora-Medium.ttf'] },
          { weight: 600, style: 'normal', src: ['./src/assets/fonts/Sora-SemiBold.ttf'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/Sora-Bold.ttf'] }
        ]
      }
    }
  ]
});
