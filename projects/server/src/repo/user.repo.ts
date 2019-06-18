import { BaseRepo } from "./base.repo";
import { User } from "@lib/models/user.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { FilterQuery } from "mongodb";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { UtilityFunctions } from "@lib/helpers/utility.helper";

export class UserRepo extends BaseRepo<User> {
  constructor() {
    super(MongoDbHelper.users);
  }
}
