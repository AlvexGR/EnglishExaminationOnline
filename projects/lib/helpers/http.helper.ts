import { HttpHeaders, HttpResponse } from "@angular/common/http";

export class HttpHelper {
  static readonly endpoint = "http://localhost:1503/api";
  static readonly users = "users";
  static readonly logIn = "log-in";
  static readonly logOut = "log-out";
  static readonly simpleExams = "simple";
  static readonly exams = "exams";
  static readonly histories = "histories";
  static readonly examVotes = "exam-votes";

  static createHeaders(
    params: Array<{ key: string; value: string }>
  ): HttpHeaders {
    let headers = new HttpHeaders();

    params.forEach(param => {
      headers = headers.append(param.key || "", param.value || "");
    });

    return headers;
  }

  static createResponse<T>(): HttpResponse<T> {
    return new HttpResponse<T>();
  }

  static createUrl(parts: Array<string>): string {
    let url = this.endpoint;

    parts.forEach(part => {
      url += `/${part}`;
    });

    return url;
  }

  static appendParams(params: Array<{ key: string; value: string }>): string {
    let result = "";

    params.forEach((param, idx) => {
      result += `${param.key}=${param.value}`;
      if (idx !== params.length - 1) {
        result += "&";
      }
    });

    return result;
  }
}
