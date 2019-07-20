import { Injectable } from "@angular/core";
import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { UserService } from "../user/user.service";
import { HttpHelper } from "@lib/helpers/http.helper";
import { HttpClient } from "@angular/common/http";
import { ILikeAndDislikeResponse } from "@lib/interfaces/exam.interface";

@Injectable({
  providedIn: "root"
})
export class ExamVoteService {
  constructor(private _userService: UserService, private _http: HttpClient) {}

  async changeVote(examVote: ExamVoteModel): Promise<ILikeAndDislikeResponse> {
    const headers = HttpHelper.createHeaders([
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: this._userService.accessToken }
    ]);

    let response = HttpHelper.createResponse<ILikeAndDislikeResponse>();
    try {
      const url = HttpHelper.createUrl([HttpHelper.examVotes]);
      response = await this._http
        .post<ILikeAndDislikeResponse>(url, examVote, {
          headers,
          observe: "response"
        })
        .toPromise();
    } catch (err) {
      return err.error;
    }

    return response.body;
  }
}
