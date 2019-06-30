import { TagModel } from "@lib/models/tag.model";

export class TagBuilder {
  private _tag: TagModel;
  constructor(id?: string) {
    this._tag = new TagModel(id);
  }

  withName(name: string): TagBuilder {
    this._tag.name = name;
    return this;
  }

  withDescription(description: string): TagBuilder {
    this._tag.description = description;
    return this;
  }

  withTagId(tagId: string): TagBuilder {
    this._tag.tagId = tagId;
    return this;
  }

  build(): TagModel {
    return this._tag;
  }
}
