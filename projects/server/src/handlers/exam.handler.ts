import { SectionHandler } from "./section.handler";
import { ExamRepo } from "../repo/exam.repo";
import {
  IExamResponse,
  ISimpleExamsResponse,
  ILikeAndDislikeResponse
} from "@lib/interfaces/exam.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ExamModel } from "@lib/models/exam.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { ExamBuilder } from "@lib/builders/exam.builder";
import { QuestionType } from "@lib/models/question.model";
import { Vote } from "@lib/models/exam-vote.model";
import { Action } from "@lib/interfaces/exam-vote.interface";

export class ExamHandlerSingleton {
  private static _examHandler: ExamHandler;

  static getInstance(): ExamHandler {
    if (!this._examHandler) {
      this._examHandler = new ExamHandler();
    }
    return this._examHandler;
  }
}

export class ExamHandler {
  private _examRepo: ExamRepo;
  private _sectionHandler: SectionHandler;
  constructor() {
    this._sectionHandler = new SectionHandler();
    this._examRepo = new ExamRepo();
  }

  async getAllSimple(): Promise<ISimpleExamsResponse> {
    const result = await this._examRepo.getBy({});
    return {
      exams: result.docs,
      votes: null,
      statusResponse: result.statusResponse
    };
  }

  async getById(id: string): Promise<IExamResponse> {
    if (!id) {
      return {
        exam: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `ExamId không hợp lệ: ${id}`
        }
      };
    }

    // Get test by id
    const result = await this._examRepo.getById(id);
    if (!result.doc) {
      return {
        exam: null,
        statusResponse: result.statusResponse
      };
    }

    // Get sections by test id
    const sectionResult = await this._sectionHandler.getByIds(
      result.doc.sectionIds
    );
    if (!sectionResult.sections) {
      return {
        exam: null,
        statusResponse: sectionResult.statusResponse
      };
    }
    result.doc.sections = sectionResult.sections;

    return {
      exam: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async insert(exam: ExamModel): Promise<IStatusResponse> {
    if (!exam) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${exam}`
      };
    }

    exam = this.assignIndex(exam);
    exam = this.assignIds(exam);
    return await this._examRepo.insert(exam);
  }

  async update(exam: ExamModel): Promise<IStatusResponse> {
    if (!exam) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${exam}`
      };
    }
    return await this._examRepo.update(exam);
  }

  async delete(id: string): Promise<IStatusResponse> {
    if (!id) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${id}`
      };
    }
    return await this._examRepo.delete(id);
  }

  async updateLikeAndDislike(
    examId: string,
    vote: Vote,
    action: Action
  ): Promise<ILikeAndDislikeResponse> {
    if (!examId) {
      return {
        dislike: null,
        like: null,
        action,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${examId}`
        }
      };
    }

    let like = 0;
    let dislike = 0;

    if (action === Action.delete) {
      like = vote === Vote.like ? -1 : 0;
      dislike = vote === Vote.dislike ? -1 : 0;
    } else if (action === Action.update) {
      like = vote === Vote.like ? 1 : -1;
      dislike = vote === Vote.dislike ? 1 : -1;
    } else {
      like = vote === Vote.like ? 1 : 0;
      dislike = vote === Vote.dislike ? 1 : 0;
    }

    const result = await this._examRepo.updateBy(
      { _id: examId },
      { $inc: { like, dislike } }
    );

    if (result.status !== StatusCode.Ok) {
      return {
        dislike: null,
        like: null,
        action,
        statusResponse: result
      };
    }

    const exam = await this._examRepo.getBy(
      {
        _id: examId
      },
      1,
      {
        like: 1,
        dislike: 1
      }
    );

    if (
      exam.statusResponse.status !== StatusCode.Ok ||
      (exam.docs && exam.docs.length === 0)
    ) {
      return {
        dislike: null,
        like: null,
        action,
        statusResponse: exam.statusResponse
      };
    }

    return {
      like: exam.docs[0].like,
      dislike: exam.docs[0].dislike,
      action,
      statusResponse: exam.statusResponse
    };
  }

  assignIndex(exam: ExamModel): ExamModel {
    if (!exam) {
      return null;
    }

    let questionNumber = 1;
    for (let i = 0; i < exam.sections.length; i++) {
      exam.sections[i].index = i + 1;
      for (let j = 0; j < exam.sections[i].questions.length; j++) {
        exam.sections[i].questions[j].index = j + 1;
        if (
          exam.sections[i].questions[j].questionType ===
          QuestionType.multipleChoice
        ) {
          exam.sections[i].questions[j].questionNumber = questionNumber++;
        }
      }
    }
    return exam;
  }

  assignIds(exam: ExamModel): ExamModel {
    if (!exam) {
      return null;
    }

    exam.sectionIds = exam.sections.map(section => section._id);
    exam.sections.forEach((section, index) => {
      exam.sections[index].questionIds = section.questions.map(
        question => question._id
      );
    });

    return exam;
  }

  createFromObj(obj: any): ExamModel {
    if (!obj) {
      return null;
    }

    const examBuilder = new ExamBuilder(obj._id);
    const exam = examBuilder
      .withContent(obj.content)
      .withDifficulty(obj.difficulty)
      .withIndex(obj.index)
      .withSectionIds(obj.sectionIds)
      .withSections(obj.sections)
      .withSubtitle(obj.subtitle)
      .withTime(obj.time)
      .withTitle(obj.title)
      .withLike(obj.like)
      .withDislike(obj.dislike)
      .build();

    return exam;
  }
}
