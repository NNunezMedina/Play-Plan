// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";
import s from "./App.module.css";

describe("App", () => {
  render(<App />);

  test("App component is mounted", () => {
    expect(screen.getByText("Nathaly Nunez")).to.exist;
  });

  test("navigates to Color Game when the Link is clicked", () => {
    const colorGameLink = screen
      .getAllByRole("link", { name: /Color Game/i })
      .find((link) => link.classList.contains(s["nav-item"]));
    fireEvent.click(colorGameLink);
    expect(
      screen.getByText("Guess which color correspond to the following RGB code")
    ).to.exist;
  });

  test("navigates to Doable when the Link is clicked", () => {
    const colorGameLink = screen
      .getAllByRole("link", { name: /Doable/i })
      .find((link) => link.classList.contains(s["nav-item"]));
    fireEvent.click(colorGameLink);
    expect(screen.getByText("Add and filter your most important tasks")).to
      .exist;
  });

  test("navigates to App when the logolink is clicked", () => {
    const logoLink = screen.getByRole("link", { name: /React Evaluation/i });
    fireEvent.click(logoLink);
    expect(screen.getByText("Nathaly Nunez")).to.exist;
  });
});
