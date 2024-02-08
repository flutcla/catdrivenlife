import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://catdrivenlife.pages.dev',
  integrations: [mdx()],
  redirects: {
    '/blog': '/blog/all'
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      [rehypeKatex, {
        // Katex plugin options
      }]
    ]
  },
});