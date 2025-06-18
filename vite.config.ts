/// <reference types="vitest" />
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-slot'
    ],
    force: true
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: false
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('date-fns')) {
              return 'vendor-date';
            }
            if (id.includes('javascript-obfuscator')) {
              return 'vendor-js-obfuscator';
            }
            if (id.includes('js-beautify') || id.includes('html-minifier-terser')) {
              return 'vendor-js-tools';
            }
            // Group other large libraries
            return 'vendor-misc';
          }
          
          // Split tools by category for better caching
          if (id.includes('/tools/')) {
            if (id.includes('JavaScriptObfuscatorTool') || id.includes('JavaScriptMinifierTool')) {
              return 'chunk-js-dev-tools';
            }
            if (id.includes('youtube/') || id.includes('YouTube')) {
              return 'chunk-youtube-tools';
            }
            if (id.includes('converter/') || id.includes('Converter')) {
              return 'chunk-converter-tools';
            }
            if (id.includes('text/') || id.includes('Text')) {
              return 'chunk-text-tools';
            }
            if (id.includes('website/') || id.includes('seo/')) {
              return 'chunk-seo-tools';
            }
            if (id.includes('image/')) {
              return 'chunk-image-tools';
            }
            return 'chunk-misc-tools';
          }
          
          // Split pages for better loading
          if (id.includes('/pages/')) {
            if (id.includes('Home')) {
              return 'page-home';
            }
            if (id.includes('Tool')) {
              return 'page-tools';
            }
            if (id.includes('Blog')) {
              return 'page-blog';
            }
            return 'page-misc';
          }
        },
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
