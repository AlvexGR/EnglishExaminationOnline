import { StatusCode } from '@lib/helpers/utility.helper';

export interface IStatusResponse {
  status: StatusCode;
  message: string;
}
