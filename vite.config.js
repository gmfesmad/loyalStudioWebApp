import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves project sites from /repo-name/
  base: command === 'build' ? '/loyalStudioWebApp/' : '/',
}));
