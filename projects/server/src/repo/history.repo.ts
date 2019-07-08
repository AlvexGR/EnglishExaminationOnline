import { BaseRepo } from "./base.repo";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { HistoryModel } from "@lib/models/history.model";

export class HistoryRepo extends BaseRepo<HistoryModel> {
  constructor() {
    super(MongoDbHelper.histories);
  }
}
