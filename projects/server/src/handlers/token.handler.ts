import { TokenRepo } from "../repo/token.repo";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import { TokenModel } from '@lib/models/token.model';

export class TokenHandlerSingleton {
  private static _tokenHandler: TokenHandler;

  static getInstance(): TokenHandler {
    if (!this._tokenHandler) {
      this._tokenHandler = new TokenHandler();
    }
    return this._tokenHandler;
  }
}

export class TokenHandler {
  private _tokenRepo: TokenRepo;
  constructor() {
    this._tokenRepo = new TokenRepo();
  }

  async verifyToken(
    token: string
  ): Promise<{ valid: boolean; statusResponse: IStatusResponse }> {
    const countToken = await this._tokenRepo.countBy({ token });

    if (countToken.statusResponse.status !== StatusCode.Ok) {
      return {
        valid: false,
        statusResponse: countToken.statusResponse
      };
    }

    if (countToken.total !== 0) {
      return {
        valid: false,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: ""
        }
      };
    }

    return {
      valid: true,
      statusResponse: countToken.statusResponse
    };
  }

  async insert(token: TokenModel): Promise<IStatusResponse> {
    return await this._tokenRepo.insertOne(token);
  }
}
