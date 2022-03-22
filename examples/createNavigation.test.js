// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { createNavigation } from "./createNavigation";
import { screen } from "@testing-library/dom";

describe("createNavigation", () => {
  it("prints a navigation list for a default kind of presentation", () => {
    const items = [
      { name: "First item", type: "text" },
      { name: "Second item", type: "text" },
      {
        name: "A nested one",
        type: "section",
        items: [{ name: "First subitem", type: "text" }],
      },
    ];
    createNavigation(items);
    screen.debug();
    // expect(document.body).toMatchSnapshot();
  });
});
