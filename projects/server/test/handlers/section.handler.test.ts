import { expect, assert, should } from "chai";
import { SectionHandler } from "@server/src/handlers/section.handler";
import { StatusCode } from "@lib/helpers/utility.helper";

describe("Get section handler", () => {
  const sectionHandler = new SectionHandler();
  it("Get section by ids", async () => {
    const ids = [
      "b0a68f44-5b43-46fc-8e47-493eac06d4a8",
      "2822c514-6707-4eb2-92b8-c5626587c6d8"
    ];
    const result = await sectionHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.sections);
    assert.notEqual(result.sections.length, 0);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get section by empty array id", async () => {
    const ids = [];
    const result = await sectionHandler.getByIds(ids);

    assert.ok(result);
    assert.ok(result.sections);
    assert.equal(result.sections.length, 0);
    assert.equal(result.statusResponse.status, StatusCode.Ok);
  });

  it("Get section by null id", async () => {
    const id = null;
    const result = await sectionHandler.getByIds(id);

    assert.ok(result);
    assert.notOk(result.sections);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });

  it("Get section by wrong id", async () => {
    const ids = [
      "wrong wrong wrong",
      "b0a68f44-5b43-46fc-8e47-493eac06d4a8",
      "2822c514-6707-4eb2-92b8-c5626587c6d8"
    ];
    const result = await sectionHandler.getByIds(ids);

    assert.ok(result);
    assert.notOk(result.sections);
    assert.equal(result.statusResponse.status, StatusCode.BadRequest);
  });
});
