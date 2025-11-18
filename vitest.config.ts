import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/tests/**/*.test.tsx"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    environment: "jsdom",
    coverage: {
      reporter: ["text", "github-actions", "json-summary", "json"],
    },
  },
});
