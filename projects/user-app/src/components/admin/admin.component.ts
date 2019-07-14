import { Component, OnInit } from "@angular/core";
import { ExamModel } from "@lib/models/exam.model";
import { ExamService } from "@app/src/services/exam/exam.service";
import { LoadingService } from "@app/src/services/loading/loading.service";
import { StatusCode, AppRoutesName } from "@lib/helpers/utility.helper";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  private _exams: Array<ExamModel>;
  private _isLoading: boolean;

  get exams(): Array<ExamModel> {
    return this._exams;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get newExamRoute(): string {
    return `/${AppRoutesName.newExam}`;
  }

  constructor(
    private _examService: ExamService,
    private _loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    await this.loadExams();
    this._loadingService.isLoading = this._isLoading = false;
  }

  async loadExams(): Promise<void> {
    const simpleExams = await this._examService.getAllSimple();
    if (simpleExams.exams) {
      this._exams = simpleExams.exams;
    }
  }

  async deleteThenReloadExams(id: string): Promise<void> {
    this._loadingService.isLoading = this._isLoading = true;
    const result = await this._examService.delete(id);
    if (result.status === StatusCode.Ok) {
      this.notifyDeleted("Xoá bài thi thành công");
      await this.loadExams();
    } else {
      this.notifyDeleted("Đã có lỗi xảy ra. Xin hãy thử lại");
    }
    this._loadingService.isLoading = this._isLoading = false;
  }

  notifyDeleted(msg: string) {
    this.snackBar.open(`${msg}`, "X", {
      duration: 3000
    });
  }
}
