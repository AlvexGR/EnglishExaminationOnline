import { Injectable } from "@angular/core";
import { User } from "projects/lib/models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILogInResponse } from "projects/lib/interfaces/user.interface";
import { IStatusResponse } from "projects/lib/interfaces/base.interface";
import { HttpHelper } from 'projects/lib/helpers/http.helper';

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
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const result = await this.http
      .post<ILogInResponse>(
        `${HttpHelper.endpoint}/${HttpHelper.users}/${HttpHelper.logIn}`,
        { username, password },
        { headers }
      )
      .toPromise();

    if (result.statusResponse.status) {
      this._currentUser = result.user;
      this._accessToken = result.accessToken;
    }
    return result.statusResponse;
  }

  async signUp(): Promise<boolean> {
    return true;
  }

  logOut(): void {
    this._currentUser = null;
    this._accessToken = null;
  }
}
