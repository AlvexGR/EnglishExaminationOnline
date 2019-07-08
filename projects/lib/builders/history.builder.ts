import { HistoryModel } from "@lib/models/history.model";
import { ExamModel } from '@lib/models/exam.model';
import { ICorrectChoice } from '@lib/interfaces/question.interface';

export class HistoryBuilder {
  private _history: HistoryModel;

  constructor(id?: string) {
    this._history = new HistoryModel(id);
  }

  withUserId(userId: string): HistoryBuilder {
    this._history.userId = userId;
    return this;
  }

  withExamId(id: string): HistoryBuilder {
    this._history.examId = id;
    return this;
  }

  withExam(exam: ExamModel): HistoryBuilder {
    this._history.exam = exam;
    return this;
  }

  withAnswer(answers: Map<string, ICorrectChoice>): HistoryBuilder {
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
