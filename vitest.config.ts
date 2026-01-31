import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
    exclude: [
      "src/components/pages/__tests__/SignUp.test.tsx",
      "src/components/pages/__tests__/SignIn.test.tsx",
      // "src/components/pages/__tests__/Learning.test.tsx",
      "src/components/pages/__tests__/Cards.test.tsx",
      "src/components/pages/__tests__/Flashcards.test.tsx",
      "src/components/pages/__tests__/Dictionary.test.tsx",
      "src/hooks/__tests__/useAuth.test.tsx",
      "src/utils/__tests__/*",
    ],
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json-summary", "json"],
    },
    setupFiles: ["./vitest-setup.ts"],
  },
  plugins: [tsconfigPaths()],
});
