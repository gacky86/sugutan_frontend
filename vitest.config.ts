import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["src/tests/**/*.test.tsx"],
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json-summary", "json"],
    },
  },
});
