import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [!process.env.VITEST && tanstackRouter(), react()].filter(Boolean),
  base: "/",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://openaccess-api.clevelandart.org",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.spec.{js,jsx,ts,tsx}",
        "src/index.{js,jsx,ts,tsx}",
        "src/setupTests.{js,ts}",
        "src/**/*.d.ts",
        "src/Api/api.ts",
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
