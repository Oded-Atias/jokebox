import { describe, expect, it } from "vitest";

describe("test infrastructure", () => {
  it("adds 1 + 1 to equal 2", () => {
    expect(1 + 1).toBe(2);
  });

  it("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });

  it("adds 1 + 3 to equal 4", () => {
    expect(1 + 3).toBe(4);
  });
});
