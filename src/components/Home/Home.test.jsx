// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  test("Home component is mounted", () => {
    expect(screen.getByText("Nathaly Nunez")).to.exist;
  });

  test("navigates to Color Game when the button in the Link is clicked", () => {
    fireEvent.click(screen.getByRole("link", { name: /Color Game/i }));
    const container = document.body;
    expect(container.innerHTML).toMatch(/color-game/i);
  });

  test("navigates to Doable when the button in the Link is clicked", () => {
    fireEvent.click(screen.getByRole("link", { name: /Doable/i }));
    const container = document.body;
    expect(container.innerHTML).toMatch(/doable/i);
  });
});
