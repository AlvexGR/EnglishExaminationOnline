import { assert } from "chai";
import { TokenRepo } from "@server/src/repo/token.repo";
import { StatusCode } from '@lib/helpers/utility.helper';

describe("Test GetBy", () => {
  // const tokenRepo = new TokenRepo();
  // it("Insert with duplicate key", async () => {
  //   const dupToken = {
  //     _id: "011733f0-76f9-4729-b173-3ce6df797674",
  //     token: "SHIT"
  //   };

  //   const result = await tokenRepo.insertOne(dupToken);
  //   assert.isOk(result);
  //   assert.notEqual(result.status, StatusCode.Ok);
  // });

  // it("Insert many", async () => {
  //   const tokens = [
  //     {
  //       _id: "1234",
  //       token: "1234"
  //     },
  //     {
  //       _id: "4321",
  //       token: "4321"
  //     }
  //   ];

  //   const result = await tokenRepo.insertMany(tokens);
  //   assert.isOk(result);
  //   assert.equal(result.status, StatusCode.Ok);
  // });

  // it("Insert many with duplicate key", async () => {
  //   const tokens = [
  //     {
  //       _id: "43212342",
  //       token: "4321"
  //     },
  //     {
  //       _id: "1234",
  //       token: "1234"
  //     },
  //     {
  //       _id: "4321",
  //       token: "4321"
  //     },
  //     {
  //       _id: "43212342111",
  //       token: "4321"
  //     }
  //   ];

  //   const result = await tokenRepo.insertMany(tokens);
  //   assert.isOk(result);
  //   assert.notEqual(result.status, StatusCode.Ok);
  // });
});
