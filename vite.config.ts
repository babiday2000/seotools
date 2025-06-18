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
    include: ['react', 'react-dom', 'react-router-dom'],
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
              return 'vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui';
            }
            if (id.includes('date-fns')) {
              return 'date';
            }
            if (id.includes('javascript-obfuscator')) {
              return 'js-obfuscator';
            }
            if (id.includes('js-beautify') || id.includes('html-minifier-terser')) {
              return 'js-tools';
            }
            // Group other large libraries
            return 'vendor-libs';
          }
          
          // Split tools by category
          if (id.includes('/tools/')) {
            if (id.includes('JavaScriptObfuscatorTool') || id.includes('JavaScriptMinifierTool')) {
              return 'js-dev-tools';
            }
            if (id.includes('youtube/') || id.includes('YouTube')) {
              return 'youtube-tools';
            }
            if (id.includes('converter/') || id.includes('Converter')) {
              return 'converter-tools';
            }
            if (id.includes('text/') || id.includes('Text')) {
              return 'text-tools';
            }
            if (id.includes('website/') || id.includes('seo/')) {
              return 'seo-tools';
            }
            if (id.includes('image/')) {
              return 'image-tools';
            }
            return 'misc-tools';
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
