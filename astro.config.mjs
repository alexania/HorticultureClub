import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://alexania.github.io',
  base: '/HorticultureClub', // Replace with your repository name if different
  output: 'static',
  trailingSlash: 'always',
  
  // Asset handling
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif']
  },
  
  // Markdown configuration
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  
  // Content collections
  content: {
    collections: {
      almanac: 'src/content/almanac',
      lore: 'src/content/lore', 
      gatherings: 'src/content/gatherings'
    }
  },
  
  // Build configuration
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  }
});