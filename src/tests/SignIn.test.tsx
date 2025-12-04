import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import SignInForm from "@/components/uis/auth/SignInForm";
import { MemoryRouter, Routes, Route } from "react-router-dom";

test("renders h1 text", () => {
  render(
    <MemoryRouter initialEntries={["/signin"]}>
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </MemoryRouter>
  );
  const headerElement = screen.getByText("Welcom back to Sugutan");
  expect(headerElement).toBeInTheDocument();
});
