import { describe, it, expect } from "vitest";
import { checkErrors } from "./checkErrors";

describe("checkErrors", () => {
  it("Having no authors returns a warning", () => {
    const input = { authors: [] };
    const output = checkErrors(input);
    expect(output[0]).toEqual({
      step: 2,
      msg: "The dataset has no authors",
      level: "warning",
    });
  });
});
