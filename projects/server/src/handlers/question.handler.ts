import { QuestionRepo } from "../repo/question.repo";
import { IQuestionsResponse } from "@lib/interfaces/question.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ITagsResponse } from "@lib/interfaces/tag.interface";
import { TagHandler } from "./tag.handler";

export class QuestionHandler {
  private _tagHandler: TagHandler;
  private _questionRepo: QuestionRepo;
  constructor() {
    this._tagHandler = new TagHandler();
    this._questionRepo = new QuestionRepo();
  }

  async getByIds(ids: Array<string>): Promise<IQuestionsResponse> {
    if (!ids) {
      return {
        questions: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Ids không hợp lệ: ${ids}`
        }
      };
    }

    // Get by ids
    const result = await this._questionRepo.getByIds(ids);
    if (!result.docs || result.docs.length !== ids.length) {
      return {
        questions: null,
        statusResponse: result.statusResponse
      };
    }

    // sort by index
    result.docs.sort((a, b) => a.index < b.index ? -1 : 1);

    // Get tags by tag ids
    const tagsPromise = new Array<Promise<ITagsResponse>>();
    result.docs.forEach(ques => {
      tagsPromise.push(this._tagHandler.getByIds(ques.tagIds));
    });

    // Await for all tags at once
    const tagResults = await Promise.all(tagsPromise);

    // Mapping
    for (let i = 0; i < result.docs.length; i++) {
      result.docs[i].tags = tagResults[i].tags;
    }

    return {
      questions: result.docs,
      statusResponse: result.statusResponse
    };
  }
}
