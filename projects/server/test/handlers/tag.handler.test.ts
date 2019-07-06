import { assert } from "chai";
import { TagHandler } from "@server/src/handlers/tag.handler";
import { StatusCode } from "@lib/helpers/utility.helper";

describe("Test tag handler", () => {
  const tagHandler = new TagHandler();
  it("Get tags by question id", async () => {
    const ids = [
      "64a4f225-6470-4c67-8ffc-5763ce8f5f62",
      "066af357-5d81-4eb3-97f0-5439b6946b33",
      "b91f1ad0-fa4c-41f6-9ba0-65c456dc07fb"
    ];
    const result = await tagHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.tags);
    assert.equal(result.tags.length, 3);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get tags by null ids", async () => {
    const ids = null;
    const result = await tagHandler.getByIds(ids);

    assert.ok(result);
    assert.notOk(result.tags);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });

  it("Get tags by string empty array", async () => {
    const ids = [];
    const result = await tagHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.tags);
    assert.equal(result.tags.length, 0);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get tags by some wrong ids", async () => {
    const ids = [
      "some stupid id",
      "64a4f225-6470-4c67-8ffc-5763ce8f5f62",
      "066af357-5d81-4eb3-97f0-5439b6946b33",
      "b91f1ad0-fa4c-41f6-9ba0-65c456dc07fb"
    ];
    const result = await tagHandler.getByIds(ids);
    assert.ok(result);
    assert.notOk(result.tags);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });
});
