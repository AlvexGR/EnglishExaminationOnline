import { TagRepo } from "../repo/tag.repo";
import { ITagsResponse, ITagResponse } from "@lib/interfaces/tag.interface";
import { StatusCode } from "@lib/helpers/utility.helper";

export class TagHandler {
  private _tagRepo: TagRepo;
  constructor() {
    this._tagRepo = new TagRepo();
  }

  async getById(id: string): Promise<ITagResponse> {
    if (!id) {
      return {
        tag: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `TagId không hợp lệ: ${id}`
        }
      };
    }

    // Get by id
    const result = await this._tagRepo.getById(id);

    return {
      tag: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async getByIds(ids: Array<string>): Promise<ITagsResponse> {
    if (!ids) {
      return {
        tags: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `TagIds không hợp lệ: ${ids}`
        }
      };
    }

    // Get by ids
    const result = await this._tagRepo.getByIds(ids);

    if (!result.docs || result.docs.length !== ids.length) {
      return {
        tags: null,
        statusResponse: result.statusResponse
      };
    }

    return {
      tags: result.docs,
      statusResponse: result.statusResponse
    };
  }
}
