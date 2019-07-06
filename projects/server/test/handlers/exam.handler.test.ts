import { expect, assert, should } from "chai";
import { ExamHandler } from "@server/src/handlers/exam.handler";
import { StatusCode } from '@lib/helpers/utility.helper';

describe("get exam handler", () => {
  const examHandler = new ExamHandler();

  it("get all simple exams", async () => {
    const result = await examHandler.getAllSimple();

    assert.ok(result);
    assert.ok(result.exams);
    assert.notEqual(result.exams.length, 0);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("get exam by id", async () => {
    const id = "5085cf19-d062-4840-a51b-4f71091886ac";
    const result = await examHandler.getById(id);

    assert.ok(result);
    assert.ok(result.exam);
    assert.ok(result.exam.sections);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("get exam by wrong id", async () => {
    const id = "Some stupid id";
    const result = await examHandler.getById(id);

    assert.ok(result);
    assert.notOk(result.exam);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });

  it("get exam by null id", async () => {
    const id = null;
    const result = await examHandler.getById(id);

    assert.ok(result);
    assert.notOk(result.exam);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });

  it("get exam by empty string id", async () => {
    const id = "";
    const result = await examHandler.getById(id);

    assert.ok(result);
    assert.notOk(result.exam);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });
});
