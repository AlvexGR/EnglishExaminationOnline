import { expect, assert, should } from "chai";
import { QuestionHandler } from "@server/src/handlers/question.handler";
import { StatusCode } from '@lib/helpers/utility.helper';

describe("Test question handler", () => {
  const questionHandler = new QuestionHandler();
  it("Get questions by ids", async () => {
    const ids = [
      "4fbee88b-f618-4fb2-b3d6-cd01e80a3f53",
      "cfc98cc3-1d86-4cb1-86d4-ac6af233011b",
      "969ce19c-a870-49a4-bdf3-1c293e71e07c"
    ];
    const result = await questionHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.questions);
    assert.equal(result.questions.length, 3);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get questions by null ids", async () => {
    const ids = null;
    const result = await questionHandler.getByIds(ids);

    assert.ok(result);
    assert.notOk(result.questions);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });

  it("Get questions by string empty ids", async () => {
    const ids = [];
    const result = await questionHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.questions);
    assert.equal(result.questions.length, 0);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get questions by wrong id", async () => {
    const ids = [
      "hehehe",
      "4fbee88b-f618-4fb2-b3d6-cd01e80a3f53",
      "cfc98cc3-1d86-4cb1-86d4-ac6af233011b",
      "969ce19c-a870-49a4-bdf3-1c293e71e07c"
    ];
    const result = await questionHandler.getByIds(ids);
    assert.ok(result);
    assert.notOk(result.questions);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });
});
