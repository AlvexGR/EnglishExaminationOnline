import { BaseRepo } from "./base.repo";
import { TokenModel } from "@lib/models/token.model";
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class TokenRepo extends BaseRepo<TokenModel> {
  constructor() {
    super(MongoDbHelper.invalidatedTokens);
  }
}
