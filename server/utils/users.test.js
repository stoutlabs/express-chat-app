const { Users } = require("./users");

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "Bobo",
        room: "Test1"
      },
      {
        id: 2,
        name: "Ted",
        room: "Test1"
      },
      {
        id: 3,
        name: "Sue",
        room: "Test2"
      }
    ];
  });

  it("should add a new user", () => {
    const myUser = {
      id: 123,
      name: "Steve",
      room: "Test2"
    };
    const res = users.addUser(myUser.id, myUser.name, myUser.room);

    expect(users.users).toContainEqual(myUser);
  });

  it("should return names of users in room 'Test1'", () => {
    const res = users.getUserList("Test1");

    expect(res).toEqual(["Bobo", "Ted"]);
  });

  it("should remove a user", () => {
    const userID = users.users[0].id;
    const user = users.removeUser(userID);

    expect(users.users).toHaveLength(2);
    expect(user.id).toEqual(userID);
  });

  it("should not remove a user", () => {
    const res = users.removeUser(69);

    expect(users.users).toHaveLength(3);
    expect(res).toBeUndefined();
  });

  it("should find user", () => {
    const userID = users.users[0].id;
    const user = users.getUser(userID);

    expect(user.id).toEqual(userID);
  });

  it("should not find user", () => {
    const res = users.getUser(69);

    expect(res).toBeUndefined();
  });
});
