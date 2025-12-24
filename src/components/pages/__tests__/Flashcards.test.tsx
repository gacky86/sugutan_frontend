import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Flashcards from "@/components/pages/Flashcards";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// svgファイルのimportのmock
vi.mock("@/assets/sugutan_logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));

test("Flashcards ページが表示される", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Flashcards />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Flashcards")).toBeInTheDocument();
});

// 現状Providerがないからエラーが出るが、sefaでのtest実装を参考に
