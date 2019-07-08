import { HistoryModel } from '@lib/models/history.model';
import { IStatusResponse } from './base.interface';

export interface IHistoriesResponse {
  histories: Array<HistoryModel>;
  statusResponse: IStatusResponse;
}

export interface IHistoryResponse {
  history: HistoryModel;
  statusResponse: IStatusResponse;
}
