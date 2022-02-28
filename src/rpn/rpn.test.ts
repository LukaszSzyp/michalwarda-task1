import { rpn } from "./rpn";

describe("rpn()", () => {
  it("returns number when passed number", () => {
    expect(rpn("2")).toBe(2);
  });

  it("correctly subtraction 2 numbers", function () {
    expect(rpn("2 0 -")).toBe(2);
  });

  it(`correctly adds 2 numbers`, async () => {
    expect(rpn("1 3 +")).toBe(4);
  });

  it(`correctly multiplication 2 numbers`, async () => {
    expect(rpn("2 2 *")).toBe(4);
  });

  it("correctly divides  2  numbers", () => {
    expect(rpn("2 2 /")).toBe(1);
  });

  it("correctly 2 2 + 3 *", () => {
    expect(rpn("2 2 + 3 *")).toBe(12);
  });

  it("correctly 4 3 4 + 5 1 + 2 * + +", () => {
    expect(rpn("4 3 4 + 5 1 + 2 * + +")).toBe(23);
  });

  it("correctly 3 1 – 2 2 + *", () => {
    expect(rpn("3 1 – 2 2 + *")).toBe(8);
  });

  it("throws on '' Invalid Expression", () => {
    expect(() => rpn("")).toThrow("Invalid Expression");
  });

  it("throws on '1 +' Not Enough Operands", () => {
    expect(() => rpn("1 +")).toThrow("Not Enough Operands");
  });
});
