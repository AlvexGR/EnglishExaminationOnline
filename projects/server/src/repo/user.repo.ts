import { BaseRepo } from "./base.repo";
import { User } from "../../../../projects/lib/models/user.model";
import { MongoDbHelper } from "../../../lib/helpers/mongoDb.helper";
import { FilterQuery } from 'mongodb';
import { IStatusResponse } from '../../../../projects/lib/interfaces/base.interface';

export class UserRepo extends BaseRepo<User> {
  constructor() {
    super(MongoDbHelper.users);
  }
}
