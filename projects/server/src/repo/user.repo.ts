import { BaseRepo } from "./base.repo";
import { UserModel } from "@lib/models/user.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class UserRepo extends BaseRepo<UserModel> {
  constructor() {
    super(MongoDbHelper.users);
  }
}
