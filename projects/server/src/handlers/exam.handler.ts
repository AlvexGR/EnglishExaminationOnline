import { SectionHandler } from "./section.handler";
import { ExamRepo } from "../repo/exam.repo";
import {
  IExamResponse,
  ISimpleExamsResponse
} from "@lib/interfaces/exam.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ExamModel } from "@lib/models/exam.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { ExamBuilder } from "@lib/builders/exam.builder";
import { QuestionType } from "@lib/models/question.model";

export class ExamHandler {
  private _examRepo: ExamRepo;
  private _sectionHandler: SectionHandler;
  constructor() {
    this._sectionHandler = new SectionHandler();
    this._examRepo = new ExamRepo();
  }

  async getAllSimple(): Promise<ISimpleExamsResponse> {
    // Get all without sections
    const result = await this._examRepo.getBy({});

    return {
      exams: result.docs,
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
    // const sectionResult = await this._sectionHandler.getByIds(
    //   result.doc.sectionIds
    // );
    // if (!sectionResult.sections) {
    //   return {
    //     exam: null,
    //     statusResponse: sectionResult.statusResponse
    //   };
    // }
    // result.doc.sections = sectionResult.sections;

    return {
      exam: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async insert(exam: ExamModel): Promise<IStatusResponse> {
    exam = this.assignIndex(exam);
    return await this._examRepo.insertOne(exam);
  }

  assignIndex(exam: ExamModel): ExamModel {
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

  createFromObj(obj: any): ExamModel {
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
      .build();

    return exam;
  }
}
