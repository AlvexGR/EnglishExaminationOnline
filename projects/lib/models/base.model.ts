import { UtilityFunctions } from '@lib/helpers/utility.helper';

export class BaseModel {
  _id: string;
  constructor(id?: string) {
    this._id = id || UtilityFunctions.generateUUID();
  }
}
