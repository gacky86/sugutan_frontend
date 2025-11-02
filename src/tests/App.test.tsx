import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "../App";

test("renders h1 text", () => {
  render(<App />);
  const headerElement = screen.getByText("API status: OK");
  expect(headerElement).toBeInTheDocument();
});
