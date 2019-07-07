import md5 from "md5";
import { v4 } from "uuid";

export class UtilityFunctions {
  static convertLocalToUTC(dateTime: Date): Date {
    let result: Date;
    try {
      result = new Date(
        dateTime.getUTCFullYear(),
        dateTime.getUTCMonth(),
        dateTime.getUTCDate(),
        dateTime.getUTCHours(),
        dateTime.getUTCMinutes(),
        dateTime.getUTCSeconds()
      );
    } catch (err) {
      console.log(err);
      return null;
    }
    return result;
  }

  static convertUTCToLocal(UTCDateTime: Date): Date {
    let result: Date;
    try {
      result = new Date(UTCDateTime.toString());
    } catch (err) {
      console.log(err);
      return null;
    }
    return result;
  }

  static hash(source: string) {
    return md5(source);
  }

  static generateUUID(): string {
    return v4();
  }
}

export class WebStorage {
  static setItemLocal(key: string, value: string): void {
    if (!this.checkStorage()) {
      return;
    }
    localStorage.setItem(key, value);
  }

  static getItemLocal(key: string): string {
    if (!this.checkStorage()) {
      return;
    }
    return localStorage.getItem(key);
  }

  static removeItemLocal(key: string): void {
    if (!this.checkStorage()) {
      return;
    }
    localStorage.removeItem(key);
  }

  static clearLocal(): void {
    if (!this.checkStorage()) {
      return;
    }
    localStorage.clear();
  }

  static setItemSession(key: string, value: string): void {
    if (!this.checkStorage()) {
      return;
    }
    sessionStorage.setItem(key, value);
  }

  static getItemSession(key: string): string {
    if (!this.checkStorage()) {
      return;
    }
    return sessionStorage.getItem(key);
  }

  static removeItemSession(key: string): void {
    if (!this.checkStorage()) {
      return;
    }
    sessionStorage.removeItem(key);
  }

  static clearSession(): void {
    if (!this.checkStorage()) {
      return;
    }
    sessionStorage.clear();
  }

  static clearBoth(): void {
    this.clearLocal();
    this.clearSession();
  }

  static checkStorage(): boolean {
    if (typeof Storage !== "undefined") {
      return true;
    }
    console.log(
      "There is no Storage on this browser. It sucks and you should use something else"
    );
    return false;
  }
}

export const AppRoutesName = {
  logIn: "log-in",
  signUp: "sign-up",
  admin: "admin",
  home: "home",
  profile: "profile",
  examPage: "exam-page",
  history: "history"
};

export enum StatusCode {
  Ok = 200,
  BadRequest = 400,
  InternalError = 500,
  Forbidden = 403
}
