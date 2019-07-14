import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";
import { AppRoutesName } from "@lib/helpers/utility.helper";

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

  get examPageRoute(): string {
    return `/${AppRoutesName.examPage}`;
  }

  get editExamRoute(): string {
    return `/${AppRoutesName.editExam}`;
  }

  @Output() delete = new EventEmitter<string>();

  constructor(private _examService: ExamService) {}

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
}
