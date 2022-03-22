import { describe, it, expect } from "vitest";
import { checkErrors } from "./checkErrors";

describe("checkErrors", () => {
  it("Returns a warning if no authors", () => {
    const input = { authors: [] };
    const output = checkErrors(input);
    expect(output[0]).toEqual({
      step: 2,
      msg: "The dataset has no authors",
      level: "warning",
    });
  });

  it("Returns an error if no resource type specified ", () => {
    const input = { authors: ["x"], resourcetype: undefined };
    const output = checkErrors(input);
    expect(output[0]).toEqual({
      step: 0,
      msg: "Pick a type for the dataset",
      level: "error",
    });
  });

  it("Returns an error if no contact persons", () => {
    const input = {
      authors: ["x"],
      resourcetype: "corpus",
      contact_person: [],
    };
    const input2 = {
      authors: ["x"],
      resourcetype: "corpus",
      contact_person: "",
    };
    const output = checkErrors(input);
    expect(output[0]).toEqual({
      step: 3,
      msg: "At least one contact person is needed",
      level: "error",
    });
    const output2 = checkErrors(input2);
    expect(output2[0]).toEqual({
      step: 3,
      msg: "At least one contact person is needed",
      level: "error",
    });
  });

  it("returns error if no title", () => {
    const input = {
      authors: ["x"],
      resourcetype: "corpus",
      contact_person: ["xx"],
      title: undefined,
    };
    const output = checkErrors(input);
    expect(output[0]).toEqual({
      step: 0,
      msg: "The dataset needs to have a name",
      level: "error",
    });
  });

  it("handles multiple errors", () => {
    const input = {};
    const output = checkErrors(input);
    expect(output).toHaveLength(4);
  });
});
