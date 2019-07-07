import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { LoadingService } from "@app/src/services/loading/loading.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private _exams: Array<ExamModel>;
  private _isLoading: boolean;

  get exams(): Array<ExamModel> {
    return this._exams;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  constructor(
    private _examService: ExamService,
    private _loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    const simpleExams = await this._examService.getAllSimple();
    if (simpleExams.exams) {
      this._exams = simpleExams.exams;
    }
    this._loadingService.isLoading = this._isLoading = false;
  }
}
