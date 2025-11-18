import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    include: ["src/tests/**/*.test.tsx"],
    exclude: [
      // 'src/tests/components/CardEdit.test.tsx',
      // 'src/tests/components/CardsList.test.tsx',
      // 'src/tests/components/FlashCardDelete.test.tsx',
      // 'src/tests/components/FlashCardDetail.test.tsx',
      // 'src/tests/components/FlashCardSetting.test.tsx',
      // 'src/tests/components/Home.test.tsx',
      // 'src/tests/components/NewCard.test.tsx',
      // 'src/tests/components/NewFlashCard.test.tsx',
    ],
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json-summary", "json"],
    },
  },
  plugins: [tsconfigPaths()],
});
