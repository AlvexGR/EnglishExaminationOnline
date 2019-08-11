import { BaseRepo } from "./base.repo";
import { TokenModel } from "@lib/models/token.model";
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class TokenRepoSingleton {
  private static _tokenRepo: TokenRepo;

  static getInstance(): TokenRepo {
    if (!this._tokenRepo) {
      this._tokenRepo = new TokenRepo();
    }
    return this._tokenRepo;
  }
}

export class TokenRepo extends BaseRepo<TokenModel> {
  constructor() {
    super(MongoDbHelper.invalidatedTokens);
  }
}
