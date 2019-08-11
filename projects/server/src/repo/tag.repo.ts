import { BaseRepo } from './base.repo';
import { TagModel } from '@lib/models/tag.model';
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class TagRepoSingleton {
  private static _tagRepo: TagRepo;

  static getInstance(): TagRepo {
    if (!this._tagRepo) {
      this._tagRepo = new TagRepo();
    }
    return this._tagRepo;
  }
}

export class TagRepo extends BaseRepo<TagModel> {
  constructor() {
    super(MongoDbHelper.tags);
  }
}
