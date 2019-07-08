import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { QuestionModel, AnswerChoice } from "@lib/models/question.model";
import { ICorrectChoice } from "@lib/interfaces/question.interface";

@Component({
  selector: "app-multiple-choice",
  templateUrl: "./multiple-choice.component.html",
  styleUrls: ["./multiple-choice.component.css"]
})
export class MultipleChoiceComponent implements OnInit {
  private _question: QuestionModel;
  private _showAnswer: boolean;
  private _selected: AnswerChoice;

  @ViewChild("choiceA") choiceA: ElementRef;
  @ViewChild("choiceB") choiceB: ElementRef;
  @ViewChild("choiceC") choiceC: ElementRef;
  @ViewChild("choiceD") choiceD: ElementRef;

  @Input()
  set question(question: QuestionModel) {
    this._question = question;
  }

  get question(): QuestionModel {
    return this._question;
  }

  @Input()
  set showAnswer(showAnswer: boolean) {
    this._showAnswer = showAnswer;
    this.setUpViewForShowAnswer();
  }

  get showAnswer(): boolean {
    return this._showAnswer;
  }

  get isCorrect(): boolean {
    return this._selected === this._question.answer;
  }

  @Output() getAnswer = new EventEmitter<ICorrectChoice>();

  constructor() {}

  ngOnInit() {}

  selectChoice(choice: AnswerChoice): void {
    this._selected = choice;
    this.getAnswer.emit({
      isCorrect: this.isCorrect,
      questionId: this._question._id,
      selectedChoice: choice
    });
  }

  setUpViewForShowAnswer(): void {
    if (!this._showAnswer) {
      return;
    }

    if (this._question.answer === AnswerChoice.A) {
      this.choiceA.nativeElement.classList.add("text-success");
    }
    if (this._question.answer === AnswerChoice.B) {
      this.choiceB.nativeElement.classList.add("text-success");
    }
    if (this._question.answer === AnswerChoice.C) {
      this.choiceC.nativeElement.classList.add("text-success");
    }
    if (this._question.answer === AnswerChoice.D) {
      this.choiceD.nativeElement.classList.add("text-success");
    }

    if (this.isCorrect) {
      return;
    }

    if (this._selected === AnswerChoice.A) {
      this.choiceA.nativeElement.classList.add("text-danger");
    }
    if (this._selected === AnswerChoice.B) {
      this.choiceB.nativeElement.classList.add("text-danger");
    }
    if (this._selected === AnswerChoice.C) {
      this.choiceC.nativeElement.classList.add("text-danger");
    }
    if (this._selected === AnswerChoice.D) {
      this.choiceD.nativeElement.classList.add("text-danger");
    }
  }
}
