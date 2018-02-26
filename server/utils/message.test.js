const moment = require("moment");

const { generateMessage, generateLocationMessage } = require("./message");

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

describe("generateLocationMessage", () => {
  it("should generate the correct location message object", () => {
    const msgFrom = "Test Name";
    const msgCoords = {
      latitude: "36.5",
      longitude: "-82.5"
    };
    const res = generateLocationMessage(
      msgFrom,
      msgCoords.latitude,
      msgCoords.longitude
    );

    expect(res).toMatchObject({
      from: msgFrom,
      url: `https://www.google.com/maps?q=${msgCoords.latitude},${
        msgCoords.longitude
      }`,
      createdAt: expect.any(Number)
    });
  });
});
