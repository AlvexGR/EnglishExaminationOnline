import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { QuestionModel, AnswerChoice } from "@lib/models/question.model";
import { IAnswerChoice } from "@lib/interfaces/question.interface";

@Component({
  selector: "app-multiple-choice",
  templateUrl: "./multiple-choice.component.html",
  styleUrls: ["./multiple-choice.component.css"]
})
export class MultipleChoiceComponent implements OnInit {
  private _question: QuestionModel;

  @Input()
  set question(question: QuestionModel) {
    this._question = question;
  }

  get question(): QuestionModel {
    return this._question;
  }

  @Output() answer = new EventEmitter<IAnswerChoice>();

  constructor() {}

  ngOnInit() {}

  selectChoice(choice: AnswerChoice): void {
    this.answer.emit({
      answerChoice: choice,
      questionId: this._question._id
    });
  }
}
