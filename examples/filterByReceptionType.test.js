import { describe, it, expect, vi } from "vitest";
import { filterByReceptionType } from "./filterByReceptionType";
vi.mock("./filterByReceptionTypeDeps", () => ({
  getPublicationAndAuthor: async () => ({
    publication: {
      receptions: {
        translation: ["moro vaan"],
      },
    },
  }),
}));

describe("filterByReceptionType", () => {
  it("does something", () => {
    const publication = {
      receptionOf: ["lkjasda", "oaisdoaisdj"],
    };
    filterByReceptionType(publication, ["translation"]);
    ////expect(true).toBe(true);
  });
});
