import { BaseRepo } from './base.repo';
import { TagModel } from '@lib/models/tag.model';
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class TagRepo extends BaseRepo<TagModel> {
  constructor() {
    super(MongoDbHelper.tags);
  }
}
