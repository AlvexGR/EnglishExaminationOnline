// import { UserRepo } from "@server/src/repo/user.repo";
// import { expect, assert, should } from "chai";

// describe("Test GetBy", () => {
//   const userRepo: UserRepo = new UserRepo();
//   it("Username: admin; Password: admin", async () => {
//     const username = "admin";
//     const password = "admin";

//     const users = await userRepo.getBy({username, password}, 1);
//     // expect(users[0].username).equal(username);
//     // expect(users[0].password).equal(password);
//     assert.isNotOk(users);
//   });
//   it("Username: testUser; Password: testUser", async () => {
//     const username = "testUser";
//     const password = "testUser";

//     const users = await userRepo.getBy({username, password}, 1);
//     expect(users[0].username).equal(username);
//     expect(users[0].password).equal(password);
//   });
//   it("Role admin", async () => {
//     const username = "admin";
//     const password = "admin";

//     const users = await userRepo.getBy({username, password}, 1);
//     expect(users[0].role).equal("admin");
//   });
//   it("Username: alvex1503; Password: ngocnhan1503", async () => {
//     const username = "alvex1503";
//     const password = "ngocnhan1503";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Wrong username. Should be null", async () => {
//     const username = "admin";
//     const password = "admin";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Wrong password. Should be null", async () => {
//     const username = "admin";
//     const password = "ngocnhan";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Wrong both. Should be null", async () => {
//     const username = "alvex2341503";
//     const password = "ngocnhfasdfan";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Username: empty. Should be null", async () => {
//     const username = "";
//     const password = "ngocnhan1503";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Password: empty. Should be null", async () => {
//     const username = "ngocnhan1503";
//     const password = "";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Both: empty. Should be null", async () => {
//     const username = "";
//     const password = "";

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
//   it("Both: null. Should be null", async () => {
//     const username = null;
//     const password = null;

//     const users = await userRepo.getBy({username, password}, 1);
//     assert.isNotOk(users);
//   });
// });
