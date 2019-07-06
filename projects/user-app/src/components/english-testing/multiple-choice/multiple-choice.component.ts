import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '@lib/models/question.model';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
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

  get questionNumber(): string {
    return this._question.questionNumber.toString();
  }

  get content(): string {
    return this._question.content;
  }

  get choiceA(): string {
    return this._question.choiceA;
  }

  get choiceB(): string {
    return this._question.choiceB;
  }

  get choiceC(): string {
    return this._question.choiceC;
  }

  get choiceD(): string {
    return this._question.choiceD;
  }

  constructor() { }

  ngOnInit() {
  }

}
