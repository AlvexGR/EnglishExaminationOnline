import { BaseRepo } from "./base.repo";
import { UserModel } from "@lib/models/user.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class UserRepoSingleton {
  private static _userRepo: UserRepo;

  static getInstance(): UserRepo {
    if (!this._userRepo) {
      this._userRepo = new UserRepo();
    }
    return this._userRepo;
  }
}

export class UserRepo extends BaseRepo<UserModel> {
  constructor() {
    super(MongoDbHelper.users);
  }
}
