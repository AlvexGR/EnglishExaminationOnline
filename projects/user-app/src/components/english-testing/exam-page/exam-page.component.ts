import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { ActivatedRoute, Router } from "@angular/router";
import {
  StatusCode,
  AppRoutesName,
  UtilityFunctions,
  DateType
} from "@lib/helpers/utility.helper";
import { ICorrectChoice } from "@lib/interfaces/question.interface";
import { LoadingService } from "@app/src/services/loading/loading.service";
import { HistoryBuilder } from "@lib/builders/history.builder";
import { HistoryService } from "@app/src/services/history/history.service";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.css"]
})
export class ExamPageComponent implements OnInit {
  private _exam: ExamModel;
  private _answer: Map<string, boolean>;
  private _isLoading: boolean;
  private _showAnswer: boolean;
  private _totalQuestions: number;
  private _correctAnswers: number;

  get exam(): ExamModel {
    return this._exam;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get showAnswer(): boolean {
    return this._showAnswer;
  }

  get correctAnswers(): number {
    return this._correctAnswers;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  constructor(
    private _examService: ExamService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loadingService: LoadingService,
    private _historyService: HistoryService
  ) {
    this._answer = new Map<string, boolean>();
  }

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    const id = this._route.snapshot.paramMap.get("id");
    const result = await this._examService.getById(id);
    if (result.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }
    this._exam = this._examService.createFromObj(result.exam);

    this._loadingService.isLoading = this._isLoading = false;
  }

  assignAnswer(answer: ICorrectChoice): void {
    this._answer.set(answer.questionId, answer.isCorrect);
  }

  checkAnswer(): void {
    this._showAnswer = true;
    this._totalQuestions = this._exam.getTotalQuestions();
    this._correctAnswers = UtilityFunctions.getCorrectAnswers(this._answer);

    const historyBuilder = new HistoryBuilder();
    const history = historyBuilder
      .withAnswer(this._answer)
      .withDate(new Date())
      .withExamId(this._exam._id)
      .build();

    console.log(history);
  }
}
