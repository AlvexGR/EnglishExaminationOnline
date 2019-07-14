import { Component, OnInit } from "@angular/core";
import { HistoryModel } from "@lib/models/history.model";
import {
  StatusCode,
  AppRoutesName
} from "@lib/helpers/utility.helper";
import { HistoryService } from "@app/src/services/history/history.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "@app/src/services/loading/loading.service";

@Component({
  selector: "app-history-detail",
  templateUrl: "./history-detail.component.html"
})
export class HistoryDetailComponent implements OnInit {
  private _history: HistoryModel;

  get history(): HistoryModel {
    return this._history;
  }

  constructor(
    private _historyService: HistoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this._loadingService.isLoading = true;
    await this.loadHistory();
    this._loadingService.isLoading = false;
  }

  async loadHistory(): Promise<void> {
    const id = this._route.snapshot.paramMap.get("id");
    const historyResult = await this._historyService.getById(id);
    if (historyResult.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }
    this._history = this._historyService.createFromObj(historyResult.history);
  }
}
