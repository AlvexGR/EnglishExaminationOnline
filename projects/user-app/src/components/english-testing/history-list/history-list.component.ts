import { Component, OnInit } from "@angular/core";
import { AppRoutesName } from "@lib/helpers/utility.helper";

@Component({
  selector: "app-history-list",
  templateUrl: "./history-list.component.html",
  styleUrls: ["./history-list.component.css"]
})
export class HistoryListComponent implements OnInit {
  get detailRoute(): string {
    return `./${AppRoutesName.historyDetail}`;
  }

  get historyId(): string {
    return "asdf";
  }

  constructor() {}

  ngOnInit() {}
}
