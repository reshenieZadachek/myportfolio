import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import { fileURLToPath } from "url";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get repository name from package.json for GitHub Pages
const getRepositoryName = () => {
  try {
    // For GitHub Pages, base should be the repository name (e.g., /portfolio/)
    const repositoryUrl = process.env.npm_package_repository_url || '';
    const repositoryName = repositoryUrl.split('/').pop()?.replace('.git', '');
    return process.env.NODE_ENV === 'production' ? `/${repositoryName || 'portfolio'}/` : '/';
  } catch (e) {
    return '/portfolio/'; // Default fallback if repository name can't be determined
  }
};

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? getRepositoryName() : '/',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
