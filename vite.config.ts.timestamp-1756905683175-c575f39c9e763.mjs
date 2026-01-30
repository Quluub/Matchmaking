// vite.config.ts
import { defineConfig } from "file:///C:/Users/user/Documents/GitHub/quluub-reborn-project-99/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Documents/GitHub/quluub-reborn-project-99/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/user/Documents/GitHub/quluub-reborn-project-99/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\user\\Documents\\GitHub\\quluub-reborn-project-99";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "https://quluub-backend-1.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path2) => path2
      }
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Optimize build for memory usage
    chunkSizeWarningLimit: 1e3,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-select"],
          "vendor-zoom": ["@zoom/videosdk", "@zoom/videosdk-ui-toolkit"],
          "vendor-peer": ["peerjs"],
          "vendor-charts": ["recharts"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers"],
          "vendor-location": ["country-state-city"]
        }
      }
    },
    // Increase memory limit for build process
    target: "esnext",
    minify: mode === "production" ? "esbuild" : false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxccXVsdXViLXJlYm9ybi1wcm9qZWN0LTk5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxccXVsdXViLXJlYm9ybi1wcm9qZWN0LTk5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvcXVsdXViLXJlYm9ybi1wcm9qZWN0LTk5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogODA4MCxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vcXVsdXViLWJhY2tlbmQtMS5vbnJlbmRlci5jb20nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBtb2RlID09PSAnZGV2ZWxvcG1lbnQnICYmXHJcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gT3B0aW1pemUgYnVpbGQgZm9yIG1lbW9yeSB1c2FnZVxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIC8vIFNwbGl0IGxhcmdlIGRlcGVuZGVuY2llcyBpbnRvIHNlcGFyYXRlIGNodW5rc1xyXG4gICAgICAgICAgJ3ZlbmRvci11aSc6IFsnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsICdAcmFkaXgtdWkvcmVhY3QtZHJvcGRvd24tbWVudScsICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0J10sXHJcbiAgICAgICAgICAndmVuZG9yLXpvb20nOiBbJ0B6b29tL3ZpZGVvc2RrJywgJ0B6b29tL3ZpZGVvc2RrLXVpLXRvb2xraXQnXSxcclxuICAgICAgICAgICd2ZW5kb3ItcGVlcic6IFsncGVlcmpzJ10sXHJcbiAgICAgICAgICAndmVuZG9yLWNoYXJ0cyc6IFsncmVjaGFydHMnXSxcclxuICAgICAgICAgICd2ZW5kb3ItZm9ybXMnOiBbJ3JlYWN0LWhvb2stZm9ybScsICdAaG9va2Zvcm0vcmVzb2x2ZXJzJ10sXHJcbiAgICAgICAgICAndmVuZG9yLWxvY2F0aW9uJzogWydjb3VudHJ5LXN0YXRlLWNpdHknXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIEluY3JlYXNlIG1lbW9yeSBsaW1pdCBmb3IgYnVpbGQgcHJvY2Vzc1xyXG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcclxuICAgIG1pbmlmeTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2VzYnVpbGQnIDogZmFsc2UsXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLFNBQVMsb0JBQW9CO0FBQ2hZLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixTQUFTLENBQUNBLFVBQVNBO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsdUJBQXVCO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixhQUFhLENBQUMsMEJBQTBCLGlDQUFpQyx3QkFBd0I7QUFBQSxVQUNqRyxlQUFlLENBQUMsa0JBQWtCLDJCQUEyQjtBQUFBLFVBQzdELGVBQWUsQ0FBQyxRQUFRO0FBQUEsVUFDeEIsaUJBQWlCLENBQUMsVUFBVTtBQUFBLFVBQzVCLGdCQUFnQixDQUFDLG1CQUFtQixxQkFBcUI7QUFBQSxVQUN6RCxtQkFBbUIsQ0FBQyxvQkFBb0I7QUFBQSxRQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxJQUNSLFFBQVEsU0FBUyxlQUFlLFlBQVk7QUFBQSxFQUM5QztBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
