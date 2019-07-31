import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { LoadingService } from "@app/src/services/loading/loading.service";
import { UserService } from "@app/src/services/user/user.service";
import { ExamVoteModel } from "@lib/models/exam-vote.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  private _exams: Array<ExamModel>;
  private _examVote: Map<string, ExamVoteModel>;
  private _isLoading: boolean;

  get exams(): Array<ExamModel> {
    return this._exams;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  examVote(examId: string): ExamVoteModel {
    return this._examVote.get(examId);
  }

  constructor(
    private _examService: ExamService,
    private _userService: UserService,
    private _loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this._loadingService.isLoading = this._isLoading = true;
    await this.loadExams();
    this._loadingService.isLoading = this._isLoading = false;
  }

  async loadExams(): Promise<void> {
    const simpleExams = await this._examService.getAllSimple(
      this._userService.userId
    );
    if (!simpleExams.exams) {
      return;
    }
    this._exams = simpleExams.exams;
    this._examVote = new Map<string, ExamVoteModel>();
    if (simpleExams.votes) {
      simpleExams.votes.forEach(vote => {
        this._examVote.set(vote.examId, vote);
      });
    }
  }
}
