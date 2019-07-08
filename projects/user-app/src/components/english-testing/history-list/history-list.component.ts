import { Component, OnInit } from "@angular/core";
import {
  AppRoutesName,
  StatusCode,
  UtilityFunctions
} from "@lib/helpers/utility.helper";
import { LoadingService } from "@app/src/services/loading/loading.service";
import { HistoryService } from "@app/src/services/history/history.service";
import { HistoryModel } from "@lib/models/history.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-history-list",
  templateUrl: "./history-list.component.html",
  styleUrls: ["./history-list.component.css"]
})
export class HistoryListComponent implements OnInit {
  private _isLoading: boolean;
  private _histories: Array<HistoryModel>;

  get detailRoute(): string {
    return `./${AppRoutesName.historyDetail}`;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get histories(): Array<HistoryModel> {
    return this._histories;
  }

  constructor(
    private _loadingService: LoadingService,
    private _historyService: HistoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  async ngOnInit() {
    this._isLoading = this._loadingService.isLoading = true;
    await this.loadHistories();
    this._isLoading = this._loadingService.isLoading = false;
  }

  async loadHistories(): Promise<void> {
    const userId = this._route.snapshot.paramMap.get("userId");
    const historyResult = await this._historyService.getByUserId(userId);
    if (historyResult.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }

    // convert utc to local time
    historyResult.histories.map(hist => {
      hist.date = UtilityFunctions.convertStringToDate(hist.date.toString());
      return hist;
    });

    // sort by date and time (newer first)
    historyResult.histories.sort((a, b) => (a.date > b.date ? -1 : 1));

    this._histories = historyResult.histories;
  }
}
