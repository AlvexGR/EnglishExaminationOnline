import { Injectable } from "@angular/core";
import { User } from "@lib/models/user.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  ILogInResponse,
  ISignUpResponse
} from "@lib/interfaces/user.interface";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { HttpHelper } from "@lib/helpers/http.helper";
import { UserBuilder } from "@lib/builders/user.builder";
import md5 = require("md5");
import { StatusCode } from '@lib/helpers/utility.helper';

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
    let response = new HttpResponse<ILogInResponse>();

    // Hash password before send to Server
    password = md5(password);

    try {
      response = await this.http
        .post<ILogInResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}/${HttpHelper.logIn}`,
          { username, password },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error.statusResponse;
    }

    const body = response.body;
    this._currentUser = body.user;
    this._accessToken = body.accessToken;

    return body.statusResponse;
  }

  async signUp(newUser: User): Promise<ISignUpResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<ISignUpResponse>();

    // Hash password before send to Server
    newUser.password = md5(newUser.password);
    try {
      response = await this.http
        .post<ISignUpResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}`,
          { user: newUser },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }

    return response.body;
  }

  logOut(): void {
    this._currentUser = this._accessToken = null;
  }

  createFromObj(obj: any): User {
    const userBuilder = new UserBuilder();

    userBuilder
      .withUsername(obj.username)
      .withPassword(obj.password)
      .withEmail(obj.email)
      .withFirstName(obj.firstName)
      .withLastName(obj.lastName)
      .withGender(obj.gender)
      .withRole(obj.role)
      .withDateOfBirth(obj.dateOfBirth);

    return userBuilder.build();
  }
}
