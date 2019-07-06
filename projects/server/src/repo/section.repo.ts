import { BaseRepo } from "./base.repo";
import { SectionModel } from "@lib/models/section.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class SectionRepo extends BaseRepo<SectionModel> {
  constructor() {
    super(MongoDbHelper.sections);
  }
}
