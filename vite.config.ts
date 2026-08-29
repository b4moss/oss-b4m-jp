import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'

export default {
  plugins: [
    vituum(),
    twig({
      root: './src',
    }),
  ],
  server: {
    host: true,
    // Codespaces / remote preview hosts
    allowedHosts: true,
  },
}
