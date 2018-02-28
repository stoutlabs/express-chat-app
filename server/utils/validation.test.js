const { isRealString } = require("./validation");

describe("isRealString", () => {
  test("should allow string with non-space characters", () => {
    const name = "  TestName123$@  ";
    const res = isRealString(name);

    expect(res).toBeTruthy();
  });

  test("should reject string with only spaces", () => {
    const badName = "  ";
    const res = isRealString(badName);

    expect(res).toBeFalsy();
  });

  test("should reject a non-string value", () => {
    const badName = 42;
    const res = isRealString(badName);

    expect(res).toBeFalsy();
  });
});
