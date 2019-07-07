import { HistoryModel } from "@lib/models/history.model";
import { ExamModel } from '@lib/models/exam.model';

export class HistoryBuilder {
  private _history: HistoryModel;

  constructor(id?: string) {
    this._history = new HistoryModel(id);
  }

  withExamId(id: string): HistoryBuilder {
    this._history.examId = id;
    return this;
  }

  withExam(exam: ExamModel): HistoryBuilder {
    this._history.exam = exam;
    return this;
  }

  withAnswer(answers: Map<string, boolean>): HistoryBuilder {
    this._history.answers = answers;
    return this;
  }

  withDate(date: Date): HistoryBuilder {
    this._history.date = date;
    return this;
  }

  build(): HistoryModel {
    return this._history;
  }
}
