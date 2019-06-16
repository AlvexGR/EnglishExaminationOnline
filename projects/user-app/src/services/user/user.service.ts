import { Injectable } from "@angular/core";
import { User } from "@lib/models/user.model";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { ILogInResponse } from "@lib/interfaces/user.interface";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { HttpHelper } from "@lib/helpers/http.helper";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _currentUser: User;
  private _accessToken: string;

  constructor(private http: HttpClient) {}

  get currentUser(): User {
    return this._currentUser;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  async logIn(username: string, password: string): Promise<IStatusResponse> {
    const result: IStatusResponse = {
      status: true,
      message: ""
    };

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<ILogInResponse>();
    try {
      response = await this.http
        .post<ILogInResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}/${HttpHelper.logIn}`,
          { username, password },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      result.status = false;
      result.message = err.error.statusResponse.message;
      return result;
    }

    const body = response.body;
    this._currentUser = body.user;
    this._accessToken = body.accessToken;

    return result;
  }

  async signUp(): Promise<boolean> {
    return true;
  }

  logOut(): void {
    this._currentUser = null;
    this._accessToken = null;
  }
}
