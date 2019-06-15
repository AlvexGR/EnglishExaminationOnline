import { Injectable } from "@angular/core";
import { User } from "projects/lib/models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private _currentUser: User;
  private _accessToken: string;

  constructor() {}

  get currentUser(): User {
    return this._currentUser;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  async logIn(): Promise<boolean> {
    return true;
  }
}
