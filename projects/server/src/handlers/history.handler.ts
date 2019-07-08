import { HistoryRepo } from "../repo/history.repo";
import {
  IHistoriesResponse,
  IHistoryResponse
} from "@lib/interfaces/history.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { HistoryModel } from "@lib/models/history.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { HistoryBuilder } from "@lib/builders/history.builder";

export class HistoryHandler {
  private _historyRepo: HistoryRepo;

  constructor() {
    this._historyRepo = new HistoryRepo();
  }

  async getById(id: string): Promise<IHistoryResponse> {
    if (!id) {
      return {
        history: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Id: ${id} không hợp lệ`
        }
      };
    }
    const result = await this._historyRepo.getById(id);
    return {
      history: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async getByUserId(userId: string): Promise<IHistoriesResponse> {
    if (!userId) {
      return {
        histories: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `UserId: ${userId} không hợp lệ`
        }
      };
    }

    const result = await this._historyRepo.getBy({ userId });
    return {
      histories: result.docs,
      statusResponse: result.statusResponse
    };
  }

  async insert(history: HistoryModel): Promise<IStatusResponse> {
    const result = await this._historyRepo.insert(history);
    return result.statusResponse;
  }

  createFromObj(obj: any): HistoryModel {
    const historyBuilder = new HistoryBuilder(obj._id);
    const history = historyBuilder
      .withAnswersArray(obj.answers)
      .withDate(obj.date)
      .withExam(obj.exam)
      .withExamId(obj.examId)
      .withUserId(obj.userId)
      .withTotalQuestions(obj.totalQuestions)
      .withCorrectAnswers(obj.correctAnswers)
      .build();
    return history;
  }
}
