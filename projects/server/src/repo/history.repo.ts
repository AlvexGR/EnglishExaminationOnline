import { BaseRepo } from "./base.repo";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { HistoryModel } from "@lib/models/history.model";

export class HistoryRepoSingleton {
  private static _historyRepo: HistoryRepo;

  static getInstance(): HistoryRepo {
    if (!this._historyRepo) {
      this._historyRepo = new HistoryRepo();
    }
    return this._historyRepo;
  }
}

export class HistoryRepo extends BaseRepo<HistoryModel> {
  constructor() {
    super(MongoDbHelper.histories);
  }
}
