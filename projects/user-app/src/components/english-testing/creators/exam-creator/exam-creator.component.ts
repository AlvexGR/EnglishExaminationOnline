import {
  Component,
  OnInit
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamBuilder } from "@lib/builders/exam.builder";
import { SectionModel } from "@lib/models/section.model";

@Component({
  selector: "app-exam-creator",
  templateUrl: "./exam-creator.component.html",
  styleUrls: ["./exam-creator.component.css"]
})
export class ExamCreatorComponent implements OnInit {
  private _examForm: FormGroup;
  private _examBuilder: ExamBuilder;
  private _sections: Array<SectionModel>;

  private _waitingForResponse: boolean;
  private _errorMessage: string;
  private _successMessage: string;

  get sections(): Array<SectionModel> {
    return this._sections;
  }

  get waitingForResponse(): boolean {
    return this._waitingForResponse;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get successMessage(): string {
    return this._successMessage;
  }

  get examForm(): FormGroup {
    return this._examForm;
  }

  get title(): AbstractControl {
    return this._examForm.get("title");
  }

  get subtitle(): AbstractControl {
    return this._examForm.get("subtitle");
  }

  get content(): AbstractControl {
    return this._examForm.get("content");
  }

  get difficulty(): AbstractControl {
    return this._examForm.get("difficulty");
  }

  constructor(
    private _examService: ExamService,
    private _formBuilder: FormBuilder
  ) {
    this._examBuilder = new ExamBuilder();
    this._sections = new Array<SectionModel>();
  }

  ngOnInit() {
    this.initExamForm();
  }

  initExamForm(): void {
    this._examForm = this._formBuilder.group({
      title: ["", Validators.required],
      subtitle: ["", Validators.required],
      content: ["", Validators.required],
      // time: ["", Validators.required], not yet support
      difficulty: [0, Validators.required]
    });
  }

  addSection(): void {
    // create a temp section model
    this._sections.push(new SectionModel("temp"));
  }

  deleteSection(index: number): void {
    this._sections.splice(index, 1);
  }

  updateSection(index: number, section: SectionModel): void {
    // Do not replace because it will reset ngFor
    this._sections[index]._id = section._id;
    this._sections[index].title = section.title;
    this._sections[index].questionIds = section.questionIds;
    this._sections[index].questions = section.questions;
  }

  async submitExam(): Promise<void> {}
}
