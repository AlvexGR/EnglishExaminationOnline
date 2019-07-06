import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { ActivatedRoute, Router } from "@angular/router";
import { StatusCode, AppRoutesName } from '@lib/helpers/utility.helper';

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.css"]
})
export class ExamPageComponent implements OnInit {
  private _exam: ExamModel;

  get title(): string {
    return this._exam.title;
  }

  get exam(): ExamModel {
    return this._exam;
  }

  constructor(
    private _examService: ExamService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  async ngOnInit() {
    const id = this._route.snapshot.paramMap.get("id");
    const result = await this._examService.getById(id);
    if (result.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }
    this._exam = result.exam;
  }
}
