import { SectionModel } from "@lib/models/section.model";
import { IStatusResponse } from "./base.interface";

export interface ISectionsResponse {
  sections: Array<SectionModel>;
  statusResponse: IStatusResponse;
}
