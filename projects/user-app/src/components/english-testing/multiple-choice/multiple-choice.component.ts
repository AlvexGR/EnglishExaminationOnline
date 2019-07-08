import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
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
export class MultipleChoiceComponent implements OnInit, OnChanges {
  private _question: QuestionModel;
  private _isCompleted: boolean;
  private _selectedChoice: AnswerChoice;

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
  set isCompleted(isCompleted: boolean) {
    this._isCompleted = isCompleted;
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  @Input()
  set selectedChoice(selectedChoice: AnswerChoice) {
    this._selectedChoice = selectedChoice;
  }

  get selectedChoice(): AnswerChoice {
    return this._selectedChoice;
  }

  get isCorrect(): boolean {
    return this._selectedChoice === this._question.answer;
  }

  @Output() getAnswer = new EventEmitter<ICorrectChoice>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setUpViewForComplete();
  }

  selectChoice(choice: AnswerChoice): void {
    this._selectedChoice = choice;
    this.getAnswer.emit({
      isCorrect: this.isCorrect,
      questionId: this._question._id,
      selectedChoice: choice
    });
  }

  setUpViewForComplete(): void {
    if (!this._isCompleted) {
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

    if (this._selectedChoice === AnswerChoice.A) {
      this.choiceA.nativeElement.classList.add("text-danger");
    }
    if (this._selectedChoice === AnswerChoice.B) {
      this.choiceB.nativeElement.classList.add("text-danger");
    }
    if (this._selectedChoice === AnswerChoice.C) {
      this.choiceC.nativeElement.classList.add("text-danger");
    }
    if (this._selectedChoice === AnswerChoice.D) {
      this.choiceD.nativeElement.classList.add("text-danger");
    }
  }
}
