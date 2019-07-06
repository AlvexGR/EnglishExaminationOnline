import { Component, OnInit } from "@angular/core";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamModel } from "@lib/models/exam.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private _exams: Array<ExamModel>;
  constructor(private _examService: ExamService) {}

  async ngOnInit() {
    const simpleExams = await this._examService.getAllSimple();
    if (simpleExams.exams) {
      this._exams = simpleExams.exams;
    }
  }

  get exams(): Array<ExamModel> {
    return this._exams;
  }
}
