import { Injectable } from "@angular/core";
import { ExamModel } from "@lib/models/exam.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  ISimpleExamsResponse,
  IExamResponse
} from "@lib/interfaces/exam.interface";
import { UserService } from "../user/user.service";
import { HttpHelper } from "@lib/helpers/http.helper";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ExamBuilder } from "@lib/builders/exam.builder";
import { IStatusResponse } from "@lib/interfaces/base.interface";

@Injectable({
  providedIn: "root"
})
export class ExamService {
  constructor(private _http: HttpClient, private _userService: UserService) {}

  async getAllSimple(userId?: string): Promise<ISimpleExamsResponse> {
    const headers = HttpHelper.createHeaders([
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: this._userService.accessToken }
    ]);

    let response = HttpHelper.createResponse<ISimpleExamsResponse>();

    try {
      let url = HttpHelper.createUrl([
        HttpHelper.exams,
        HttpHelper.simpleExams
      ]);
      url += HttpHelper.appendParams([userId]);
      response = await this._http
        .get<ISimpleExamsResponse>(url, { headers, observe: "response" })
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
  }

  async getById(id: string): Promise<IExamResponse> {
    if (!id) {
      return {
        exam: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: "ExamId không hợp lệ"
        }
      };
    }
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this._userService.accessToken
    });

    let response = new HttpResponse<IExamResponse>();

    try {
      response = await this._http
        .get<IExamResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.exams}/${id}`,
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
  }

  async insert(exam: ExamModel): Promise<IStatusResponse> {
    const headers = HttpHelper.createHeaders([
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: this._userService.accessToken }
    ]);

    let response = new HttpResponse<IStatusResponse>();

    try {
      response = await this._http
        .post<IStatusResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.exams}`,
          exam,
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
  }

  async update(exam: ExamModel): Promise<IStatusResponse> {
    const headers = HttpHelper.createHeaders([
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: this._userService.accessToken }
    ]);

    let response = HttpHelper.createResponse<IStatusResponse>();

    try {
      const url = HttpHelper.createUrl([HttpHelper.exams]);

      response = await this._http
        .put<IStatusResponse>(url, exam, {
          headers,
          observe: "response"
        })
        .toPromise();
    } catch (err) {
      return err.error;
    }

    return response.body;
  }

  async delete(id: string): Promise<IStatusResponse> {
    const headers = HttpHelper.createHeaders([
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: this._userService.accessToken }
    ]);

    let response = new HttpResponse<IStatusResponse>();

    try {
      response = await this._http
        .delete<IStatusResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.exams}/${id}`,
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }
    return response.body;
  }

  createFromObj(obj: ExamModel): ExamModel {
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
