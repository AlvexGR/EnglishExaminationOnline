import { Component, OnInit, Input } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { ActivatedRoute, Router } from "@angular/router";
import {
  StatusCode,
  AppRoutesName,
  UtilityFunctions
} from "@lib/helpers/utility.helper";
import { IChoice } from "@lib/interfaces/question.interface";
import { LoadingService } from "@app/src/services/loading/loading.service";
import { HistoryBuilder } from "@lib/builders/history.builder";
import { HistoryService } from "@app/src/services/history/history.service";
import { HistoryModel } from "@lib/models/history.model";
import { UserService } from "@app/src/services/user/user.service";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html"
})
export class ExamPageComponent implements OnInit {
  private _exam: ExamModel;
  private _history: HistoryModel;
  private _answers: Map<string, IChoice>;
  private _isLoading: boolean;
  private _isCompleted: boolean;
  private _totalQuestions: number;
  private _correctAnswers: number;

  @Input()
  set history(history: HistoryModel) {
    // Set up for history
    this._history = history;
    this._exam = this._history.exam;
    this._answers = this.history.getAnswersMap();
    this._isCompleted = true;
    this._totalQuestions = this._history.totalQuestions;
    this._correctAnswers = this._history.correctAnswers;
  }

  get history(): HistoryModel {
    return this._history;
  }

  get exam(): ExamModel {
    return this._exam;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get correctAnswers(): number {
    return this._correctAnswers;
  }

  get totalQuestions(): number {
    return this._totalQuestions;
  }

  get answers(): Map<string, IChoice> {
    return this._answers;
  }

  get score(): number {
    return (this._correctAnswers / this._totalQuestions) * 100;
  }

  constructor(
    private _examService: ExamService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loadingService: LoadingService,
    private _historyService: HistoryService,
    private _userService: UserService
  ) {
    this._answers = new Map<string, IChoice>();
  }

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    await this.loadExam();
    this._loadingService.isLoading = this._isLoading = false;
  }

  async loadExam(): Promise<void> {
    if (this._exam) {
      return;
    }

    // If normal exam => load it from id in URL
    const id = this._route.snapshot.paramMap.get("id");
    const result = await this._examService.getById(id);
    if (result.statusResponse.status !== StatusCode.Ok) {
      this._router.navigate([`/${AppRoutesName.home}`]);
      return;
    }
    this._exam = this._examService.createFromObj(result.exam);
  }

  assignAnswer(questionId: string, correctChoice: IChoice): void {
    this._answers.set(questionId, correctChoice);
  }

  checkAnswer(): void {
    this._isCompleted = true;
    this._totalQuestions = this._exam.getTotalQuestions();
    this._correctAnswers = UtilityFunctions.getCorrectAnswers(this._answers);

    const historyBuilder = new HistoryBuilder();

    const history = historyBuilder
      .withAnswersMap(this._answers)
      .withDate(new Date())
      .withTotalQuestions(this._totalQuestions)
      .withCorrectAnswers(this._correctAnswers)
      .withExamId(this._exam._id)
      .withExam(this._exam)
      .withUserId(this._userService.userId)
      .build();

    // Send and forget
    this._historyService.insert(history);
  }
}
