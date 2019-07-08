import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ICorrectChoice } from "@lib/interfaces/question.interface";
import { AnswerChoice } from "@lib/models/question.model";
import { HistoryModel } from '@lib/models/history.model';

@Component({
  selector: "app-history-detail",
  templateUrl: "./history-detail.component.html",
  styleUrls: ["./history-detail.component.css"]
})
export class HistoryDetailComponent implements OnInit {
  private _history: HistoryModel;

  get history(): HistoryModel {
    return this._history;
  }
  constructor(private _examService: ExamService) {}

  async ngOnInit() {
    console.log("getting exam");
    const examResult = await this._examService.getById(
      "5085cf19-d062-4840-a51b-4f71091886ac"
    );
    const exam = this._examService.createFromObj(examResult.exam);
    const answers = new Map<string, ICorrectChoice>();
    answers.set("4fbee88b-f618-4fb2-b3d6-cd01e80a3f53", {
      questionId: "4fbee88b-f618-4fb2-b3d6-cd01e80a3f53",
      isCorrect: true,
      selectedChoice: AnswerChoice.C
    });
    answers.set("cfc98cc3-1d86-4cb1-86d4-ac6af233011b", {
      questionId: "cfc98cc3-1d86-4cb1-86d4-ac6af233011b",
      isCorrect: false,
      selectedChoice: AnswerChoice.C
    });
    answers.set("81fc6abf-c97a-4047-8910-ba1a31dbc819", {
      questionId: "81fc6abf-c97a-4047-8910-ba1a31dbc819",
      isCorrect: true,
      selectedChoice: AnswerChoice.A
    });
    answers.set("81a99879-95ad-4f2a-81bd-1095abe7afb0", {
      questionId: "81a99879-95ad-4f2a-81bd-1095abe7afb0",
      isCorrect: true,
      selectedChoice: AnswerChoice.C
    });
    answers.set("43d8cbf6-1161-40ac-a815-e5afb1a84d72", {
      questionId: "43d8cbf6-1161-40ac-a815-e5afb1a84d72",
      isCorrect: false,
      selectedChoice: AnswerChoice.D
    });
    const history = new HistoryModel();
    history.exam = exam;
    history.answers = answers;
    this._history = history;
    console.log("Done getting exam");
  }
}
