import { SectionHandler } from "./section.handler";
import { ExamRepo } from "../repo/exam.repo";
import {
  IExamResponse,
  ISimpleExamsResponse
} from "@lib/interfaces/exam.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ExamModel } from '@lib/models/exam.model';
import { IStatusResponse } from '@lib/interfaces/base.interface';

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
    const result = await this._examRepo.insert(exam);
    return result.statusResponse;
  }
}
