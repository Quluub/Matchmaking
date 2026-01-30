import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'https://quluub-backend-1.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // MAXIMUM PERFORMANCE - NO LAZY LOADING, INSTANT LOADING
    chunkSizeWarningLimit: 5000,
    sourcemap: false,
    rollupOptions: {
      output: {
        // SINGLE BUNDLE FOR INSTANT LOADING - NO CODE SPLITTING
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true
      },
      mangle: {
        safari10: true,
        toplevel: true
      }
    },
    reportCompressedSize: false,
    cssCodeSplit: false,
    assetsInlineLimit: 100000,
  },
}));
