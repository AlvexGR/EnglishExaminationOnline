import { Injectable } from '@angular/core';
import { ExamModel } from './node_modules/@lib/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private _exam: ExamModel;
  constructor() { }
}
