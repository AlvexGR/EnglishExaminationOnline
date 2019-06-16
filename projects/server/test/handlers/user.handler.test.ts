import { expect, assert, should } from "chai";
import { UserHandler } from '@server/src/handlers/user.handler';

describe("Test GetBy", () => {
  const userHandler: UserHandler = new UserHandler();
  it("Username: admin; Password: admin", async () => {
    const username = "admin";
    const password = "admin";

    const result = await userHandler.getBy({username, password});
    const user = result.users[0];
    expect(user.username).equal(username);
    expect(user.password).equal(password);
  });
  it("Username: testUser; Password: testUser", async () => {
    const username = "testUser";
    const password = "testUser";

    const result = await userHandler.getBy({username, password});
    const user = result.users[0];
    expect(user.username).equal(username);
    expect(user.password).equal(password);
  });
  it("Role admin", async () => {
    const username = "admin";
    const password = "admin";

    const result = await userHandler.getBy({username, password});
    const user = result.users[0];
    expect(user.role).equal("admin");
  });
  it("User array should has length 1", async () => {
    const username = "admin";
    const password = "admin";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(1);
  });
  it("Wrong username. User array should has length 0", async () => {
    const username = "2341234";
    const password = "admin";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Wrong password. User array should has length 0", async () => {
    const username = "admin";
    const password = "ngocnhan";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Wrong both. User array should has length 0", async () => {
    const username = "alvex2341503";
    const password = "ngocnhfasdfan";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Username: empty. User array should has length 0", async () => {
    const username = "";
    const password = "ngocnhan1503";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Password: empty. User array should has length 0", async () => {
    const username = "ngocnhan1503";
    const password = "";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Both: empty. User array should has length 0", async () => {
    const username = "";
    const password = "";

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
  it("Both: null. User array should has length 0", async () => {
    const username = null;
    const password = null;

    const result = await userHandler.getBy({username, password});
    expect(result.users.length).to.equal(0);
  });
});
