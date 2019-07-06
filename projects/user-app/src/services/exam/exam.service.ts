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

@Injectable({
  providedIn: "root"
})
export class ExamService {
  private _exam: ExamModel;
  constructor(private _http: HttpClient, private _userService: UserService) {}

  async getAllSimple(): Promise<ISimpleExamsResponse> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    let response = new HttpResponse<ISimpleExamsResponse>();

    try {
      response = await this._http
        .get<ISimpleExamsResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.exams}/${HttpHelper.simpleExams}`,
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return {
        exams: null,
        statusResponse: err.body.statusResponse
      };
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
}
