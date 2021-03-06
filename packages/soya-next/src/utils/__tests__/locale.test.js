import { ensurePath, toPath, trimPath } from "../locale";

describe("Locale Utils", () => {
  describe("ensurePath", () => {
    it("should ensure non-default locale url to have locale segment", () => {
      expect(
        ensurePath("/about", { language: "en", country: "id" }, "id-id")
      ).toBe("/en/about");

      expect(ensurePath("/", { language: "en", country: "id" }, "id-id")).toBe(
        "/en/"
      );
    });

    it("should ensure default locale url to not have locale segment", () => {
      expect(
        ensurePath("/about", { language: "id", country: "id" }, "id-id")
      ).toBe("/about");
    });

    it("should return as is when locale segment matches current locale", () => {
      expect(
        ensurePath("/en-sg/about", { language: "en", country: "sg" }, "id-id")
      ).toBe("/en-sg/about");
    });
  });

  describe("toPath", () => {
    it("should return an empty string if no arguments are specified", () => {
      expect(toPath()).toBe("");
    });

    it("should throw an error if locale is not an object", () => {
      expect(() => {
        toPath({}, "id-id");
      }).toThrow(
        "Expected locale to be an object with country and language properties."
      );
    });

    it("should throw an error if default locale is not a locale string", () => {
      expect(() => {
        toPath({ language: "id", country: "id" }, "id");
      }).toThrow("Expected defaultLocale to be a locale string.");
    });

    it("should replace default locale object to empty string", () => {
      expect(toPath({ language: "id", country: "id" }, "id-id")).toBe("");
    });

    it("should replace locale object with same default country to language segment only", () => {
      expect(toPath({ language: "en", country: "id" }, "id-id")).toBe("/en");
    });

    it("should replace non-default locale object to locale segment", () => {
      expect(toPath({ language: "en", country: "sg" }, "id-id")).toBe("/en-sg");
    });
  });

  describe("trimPath", () => {
    it("should return url as is if defaultLocale and siteLocales arguments are not specified", () => {
      expect(trimPath("/en/")).toBe("/en/");
    });

    it("should remove locale segment from non-default locale url", () => {
      expect(trimPath("/en/about", "id-id", ["id-id", "en-id"])).toBe("/about");
    });

    it("should not remove anything from default locale url", () => {
      expect(trimPath("/", "id-id", ["id-id", "en-id"])).toBe("/");

      expect(trimPath("/about", "id-id", ["id-id", "en-id"])).toBe("/about");
    });
  });
});
