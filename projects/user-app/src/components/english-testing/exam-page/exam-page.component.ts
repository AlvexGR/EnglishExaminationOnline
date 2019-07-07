import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { ActivatedRoute, Router } from "@angular/router";
import { StatusCode, AppRoutesName } from "@lib/helpers/utility.helper";
import { AnswerChoice } from "@lib/models/question.model";
import { IAnswerChoice } from "@lib/interfaces/question.interface";
import { LoadingService } from "@app/src/services/loading/loading.service";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.css"]
})
export class ExamPageComponent implements OnInit {
  private _exam: ExamModel;
  private _answer: Map<string, AnswerChoice>;
  private _isLoading: boolean;

  get exam(): ExamModel {
    return this._exam;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  constructor(
    private _examService: ExamService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this._answer = new Map<string, AnswerChoice>();
  }

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    const id = this._route.snapshot.paramMap.get("id");
    const result = await this._examService.getById(id);
    if (result.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }
    this._exam = result.exam;

    this._loadingService.isLoading = this._isLoading = false;
  }

  assignAnswer(answer: IAnswerChoice): void {
    this._answer.set(answer.questionId, answer.answerChoice);
  }

  checkAnswer(): void {
    
  }
}
