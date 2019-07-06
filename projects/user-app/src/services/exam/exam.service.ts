import { Injectable } from '@angular/core';
import { ExamModel } from '@lib/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private _exam: ExamModel;
  constructor() { }
}
