import { TagModel } from '@lib/models/tag.model';
import { IStatusResponse } from './base.interface';

export interface ITagResponse {
  tag: TagModel;
  statusResponse: IStatusResponse;
}

export interface ITagsResponse {
  tags: Array<TagModel>;
  statusResponse: IStatusResponse;
}
