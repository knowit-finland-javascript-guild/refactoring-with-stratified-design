// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { createNavigation } from "./createNavigation";
import { screen } from "@testing-library/dom";

describe("createNavigation", () => {
  it("Prints a navigation list with subitems", () => {
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
    expect(document.body).toMatchSnapshot();
  });

  it("Prints Untitled for items without names", () => {
    createNavigation([{ name: "", type: "text" }]);
    expect(screen.getByText("Untitled")).not.toBeFalsy();
  });
});
