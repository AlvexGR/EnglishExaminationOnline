import { Injectable } from "@angular/core";
import { UserModel, UserRole } from "@lib/models/user.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  ILogInResponse,
  ISignUpResponse,
  IUpdateResponse,
  IUserResponse
} from "@lib/interfaces/user.interface";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { HttpHelper } from "@lib/helpers/http.helper";
import { UserBuilder } from "@lib/builders/user.builder";
import { UtilityFunctions, WebStorage } from "@lib/helpers/utility.helper";
import { Observable, BehaviorSubject } from "rxjs";
import { TokenModel } from "@lib/models/token.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _currentUser: UserModel;
  private _accessToken: string;
  private _userObservable: BehaviorSubject<UserModel>;

  constructor(private _http: HttpClient) {
    this._userObservable = new BehaviorSubject<UserModel>(this._currentUser);
  }

  get userObservable(): Observable<UserModel> {
    return this._userObservable.asObservable();
  }

  private set setUser(value: UserModel) {
    this._currentUser = value;
    this._userObservable.next(value);
  }

  get currentUser(): UserModel {
    return this._currentUser;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get isAdmin(): boolean {
    return this._currentUser && this._currentUser.role === UserRole.admin;
  }

  get userId(): string {
    return this._currentUser && this._currentUser._id;
  }

  async getThenSet(userId: string, accessToken: string): Promise<void> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: accessToken
    });
    let response = new HttpResponse<IUserResponse>();
    try {
      response = await this._http
        .get<IUserResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}/${userId}`,
          { headers, observe: "response" }
        )
        .toPromise();
      this.setUser = response.body.user;
      this._accessToken = accessToken;
    } catch (err) {
      // ignore it for now
      // console.log("Get user stored in web storage failed: " + err);
    }
  }

  async logIn(username: string, password: string): Promise<IStatusResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<ILogInResponse>();

    // Hash password before send to Server
    password = UtilityFunctions.hash(password);

    try {
      response = await this._http
        .post<ILogInResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}/${HttpHelper.logIn}`,
          { username, password },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error.statusResponse;
    }

    // Log out before process new user
    await this.logOut();

    const body = response.body;
    this.setUser = body.user;
    this._accessToken = body.accessToken;

    // Store current user Id and access token to local store
    WebStorage.setItemLocal("userId", this._currentUser._id);
    WebStorage.setItemLocal("accessToken", this._accessToken);
    return body.statusResponse;
  }

  async signUp(newUser: UserModel): Promise<ISignUpResponse> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<ISignUpResponse>();

    // Hash password before send to Server
    newUser.password = UtilityFunctions.hash(newUser.password);
    try {
      response = await this._http
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

  async update(
    updatedUser: UserModel,
    currentPassword?: string
  ): Promise<IUpdateResponse> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.accessToken
    });
    let response = new HttpResponse<IUpdateResponse>();

    // hash password
    if (updatedUser.password) {
      updatedUser.password = UtilityFunctions.hash(updatedUser.password);
    } else {
      updatedUser.password = this.currentUser.password;
    }
    currentPassword = currentPassword && UtilityFunctions.hash(currentPassword);

    try {
      response = await this._http
        .put<IUpdateResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}`,
          {
            user: updatedUser,
            currentUserId: this.currentUser._id,
            inputPassword: currentPassword
          },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      return err.error;
    }

    this.setUser = updatedUser;
    return response.body;
  }

  async logOut(): Promise<void> {
    if (!this._accessToken && !WebStorage.getItemLocal("accessToken")) {
      return;
    }

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    let response = new HttpResponse<IStatusResponse>();
    const token = new TokenModel();
    token.token = this._accessToken || WebStorage.getItemLocal("accessToken");

    try {
      response = await this._http
        .post<IStatusResponse>(
          `${HttpHelper.endpoint}/${HttpHelper.users}/${HttpHelper.logOut}`,
          { token },
          { headers, observe: "response" }
        )
        .toPromise();
    } catch (err) {
      // ignore
    }

    this.setUser = this._accessToken = null;
    WebStorage.clearBoth();
  }

  createFromObj(obj: any): UserModel {
    const userBuilder = new UserBuilder(obj._id);

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
