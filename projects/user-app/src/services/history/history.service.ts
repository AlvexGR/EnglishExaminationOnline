import { Injectable } from "@angular/core";
import { HistoryModel } from "@lib/models/history.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { UserService } from "../user/user.service";
import { HttpHeaders, HttpResponse, HttpClient } from "@angular/common/http";
import { HttpHelper } from "@lib/helpers/http.helper";
import {
  IHistoryResponse,
  IHistoriesResponse
} from "@lib/interfaces/history.interface";
import { HistoryBuilder } from '@lib/builders/history.builder';

@Injectable({
  providedIn: "root"
})
export class HistoryService {
  constructor(private _userService: UserService, private _http: HttpClient) {}

  async insert(history: HistoryModel): Promise<IStatusResponse> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this._userService.accessToken
    });

    let response = new HttpResponse<IStatusResponse>();

    try {
      response = await this._http
        .post<IStatusResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.histories}`,
          history,
          {
            headers,
            observe: "response"
          }
        )
        .toPromise();
    } catch (err) {
      return err.error.statusResponse;
    }

    return response.body;
  }

  async getById(id: string): Promise<IHistoryResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<IHistoryResponse>();
    try {
      response = await this._http
        .get<IHistoryResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.histories}/${id}`,
          {
            headers,
            observe: "response"
          }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
  }

  async getByUserId(userId: string): Promise<IHistoriesResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<IHistoriesResponse>();
    try {
      response = await this._http
        .get<IHistoriesResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.histories}/${
            HttpHelper.users
          }/${userId}`,
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
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
