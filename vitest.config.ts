import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["src/tests/**/*.test.tsx"],
    environment: "jsdom",
    coverage: {
      reporter: ["text", "github-actions", "json-summary", "json"],
    },
  },
});
