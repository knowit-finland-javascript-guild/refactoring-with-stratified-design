import { describe, it, expect, vi } from "vitest";
import { filterByReceptionType } from "./filterByReceptionType";
import { getPublicationAndAuthor } from "./filterByReceptionTypeDeps";
vi.mock("./filterByReceptionTypeDeps");

describe("filterByReceptionType", () => {
  it("returns true if reception exists", async () => {
    const pubId = "xxxx";
    getPublicationAndAuthor.mockImplementation(async () => ({
      publication: {
        receptions: {
          translation: [pubId],
        },
      },
    }));
    const publication = {
      _id: pubId,
      receptionOf: ["yyy"],
    };
    const passesFilter = await filterByReceptionType(publication, [
      "translation",
    ]);
    expect(passesFilter).toEqual(true);
  });

  it("returns false if reception does not exist", async () => {
    const pubId = "xxxx";
    getPublicationAndAuthor.mockImplementation(async () => ({
      publication: {
        receptions: {
          translation: ["other-id"],
        },
      },
    }));
    const publication = {
      _id: pubId,
      receptionOf: ["yyy"],
    };
    const passesFilter = await filterByReceptionType(publication, [
      "translation",
    ]);
    expect(passesFilter).toEqual(false);
  });

  it("returns true if searching for originals and is not a reception", async () => {
    const publication = {
      _id: "xx",
      receptionOf: [],
    };
    const passesFilter = await filterByReceptionType(publication, ["original"]);
    expect(passesFilter).toEqual(true);
  });

  it("returns false if no receptions and not searching for originals", async () => {
    const publication = {
      _id: "xx",
      receptionOf: [],
    };
    const passesFilter = await filterByReceptionType(publication, [
      "translation",
    ]);
    expect(passesFilter).toEqual(false);
  });
});
