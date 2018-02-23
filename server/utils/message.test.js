//const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    const msgFrom = "Test Name";
    const msgText = "Test message text.";
    const res = generateMessage(msgFrom, msgText);

    expect(res).toMatchObject({
      from: msgFrom,
      text: msgText,
      createdAt: expect.any(Number)
    });
  });
});
