import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { AppRoutesName, StatusCode } from "@lib/helpers/utility.helper";
import { ExamVoteModel, Vote } from "@lib/models/exam-vote.model";
import { ExamVoteService } from "@app/src/services/exam-vote/exam-vote.service";
import { UserService } from "@app/src/services/user/user.service";
import { ExamVoteBuilder } from "@lib/builders/exam-vote.builder";
import { ILikeAndDislikeResponse } from "@lib/interfaces/exam.interface";
import { Action } from "@lib/interfaces/exam-vote.interface";

@Component({
  selector: "app-exam-card",
  templateUrl: "./exam-card.component.html",
  styleUrls: ["./exam-card.component.css"]
})
export class ExamCardComponent implements OnChanges {
  starOne: boolean;
  starTwo: boolean;
  starThree: boolean;
  starFour: boolean;
  starFive: boolean;
  noStarOne: boolean;
  noStarTwo: boolean;
  noStarThree: boolean;
  noStarFour: boolean;
  noStarFive: boolean;
  halfStar: boolean;

  private _exam: ExamModel;
  private _examVote: ExamVoteModel;
  private _isHome: boolean;

  get time(): string {
    const hours = this._exam.time / 60;
    const minutes = this._exam.time % 60;
    let time = "";
    if (hours >= 1) {
      time += `${hours} tiếng `;
    }
    time += `${minutes} phút`;
    return time;
  }

  @Input()
  set isHome(value: boolean) {
    this._isHome = value;
  }

  get isHome(): boolean {
    return this._isHome;
  }

  @Input()
  set exam(exam: ExamModel) {
    this._exam = exam;
  }

  get exam(): ExamModel {
    return this._exam;
  }

  @Input()
  set examVote(examVote: ExamVoteModel) {
    this._examVote = examVote;
  }

  get examVote(): ExamVoteModel {
    return this._examVote;
  }

  get examPageRoute(): string {
    return `/${AppRoutesName.examPage}`;
  }

  get editExamRoute(): string {
    return `/${AppRoutesName.editExam}`;
  }

  get isLike(): boolean {
    if (!this._examVote) {
      return false;
    }
    return this._examVote.vote === Vote.like;
  }

  get isDislike(): boolean {
    if (!this._examVote) {
      return false;
    }
    return this._examVote.vote === Vote.dislike;
  }

  @Output() delete = new EventEmitter<string>();

  constructor(
    private _examService: ExamService,
    private _examVoteService: ExamVoteService,
    private _userService: UserService
  ) {}

  ngOnChanges() {
    this.setUpDifficulty();
  }

  setUpDifficulty(): void {
    if (!this._exam) {
      return;
    }

    const difficulty = this._exam.difficulty;

    this.starOne = difficulty >= 1;
    this.starTwo = difficulty >= 2;
    this.starThree = difficulty >= 3;
    this.starFour = difficulty >= 4;
    this.starFive = difficulty === 5;

    if (difficulty !== Math.floor(difficulty)) {
      this.halfStar = true;
    }

    this.noStarOne = difficulty === 0;
    this.noStarTwo = difficulty <= 1;
    this.noStarThree = difficulty <= 2;
    this.noStarFour = difficulty <= 3;
    this.noStarFive = difficulty <= 4;
  }

  deleteExam(): void {
    this.delete.emit(this._exam._id);
  }

  async changeVote(isLike: boolean): Promise<void> {
    if (!this._examVote) {
      const evBuilder = new ExamVoteBuilder();
      evBuilder
        .withExamId(this._exam._id)
        .withUserId(this._userService.userId)
        .withVote(isLike ? Vote.like : Vote.dislike);
      this._examVote = evBuilder.build();
    } else {
      this._examVote.vote = isLike ? Vote.like : Vote.dislike;
    }
    const changeVoteResult = await this._examVoteService.changeVote(
      this._examVote
    );
    this.updateLikeAndDislike(changeVoteResult);
  }

  updateLikeAndDislike(likeAndDislikeRes: ILikeAndDislikeResponse): void {
    if (
      !likeAndDislikeRes ||
      (likeAndDislikeRes &&
        likeAndDislikeRes.statusResponse &&
        likeAndDislikeRes.statusResponse.status !== StatusCode.Ok)
    ) {
      return;
    }

    if (likeAndDislikeRes.action === Action.delete) {
      this._examVote = null;
    }

    this._exam.like = likeAndDislikeRes.like;
    this._exam.dislike = likeAndDislikeRes.dislike;
  }
}
