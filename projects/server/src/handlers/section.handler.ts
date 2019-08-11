import { SectionRepo, SectionRepoSingleton } from "../repo/section.repo";
import { QuestionHandler } from "./question.handler";
import { ISectionsResponse } from "@lib/interfaces/section.interface";
import { IQuestionsResponse } from "@lib/interfaces/question.interface";
import { StatusCode } from "@lib/helpers/utility.helper";

export class SectionHandler {
  private _sectionRepo: SectionRepo;
  private _questionHandler: QuestionHandler;
  constructor() {
    this._sectionRepo = SectionRepoSingleton.getInstance();
    this._questionHandler = new QuestionHandler();
  }

  async getByIds(ids: Array<string>): Promise<ISectionsResponse> {
    if (!ids) {
      return {
        sections: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `SectionIds không hợp lệ: ${ids}`
        }
      };
    }

    // Get sections by testId
    const result = await this._sectionRepo.getByIds(ids);
    if (!result.docs || result.docs.length !== ids.length) {
      return {
        sections: null,
        statusResponse: result.statusResponse
      };
    }

    // sort by index
    result.docs.sort((a, b) => (a.index < b.index ? -1 : 1));

    // Get questions by section id
    const questionsPromise = new Array<Promise<IQuestionsResponse>>();
    result.docs.forEach(sect => {
      questionsPromise.push(this._questionHandler.getByIds(sect.questionIds));
    });

    // Await questions all at once
    const questionResults = await Promise.all(questionsPromise);

    // Mapping
    for (let i = 0; i < questionResults.length; i++) {
      result.docs[i].questions = questionResults[i].questions;
    }

    return {
      sections: result.docs,
      statusResponse: result.statusResponse
    };
  }
}
