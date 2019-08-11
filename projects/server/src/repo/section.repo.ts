import { BaseRepo } from "./base.repo";
import { SectionModel } from "@lib/models/section.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class SectionRepoSingleton {
  private static _sectionRepo: SectionRepo;

  static getInstance(): SectionRepo {
    if (!this._sectionRepo) {
      this._sectionRepo = new SectionRepo();
    }
    return this._sectionRepo;
  }
}

export class SectionRepo extends BaseRepo<SectionModel> {
  constructor() {
    super(MongoDbHelper.sections);
  }
}
