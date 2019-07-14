import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ExamService } from "@app/src/services/exam/exam.service";
import { ExamBuilder } from "@lib/builders/exam.builder";
import { SectionModel } from "@lib/models/section.model";
import { ExamModel } from "@lib/models/exam.model";
import { StatusCode, AppRoutesName } from "@lib/helpers/utility.helper";
import { Router, ActivatedRoute } from "@angular/router";
enum ComponentPath {
  New,
  Edit
}

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
  private _currentPath: ComponentPath;

  get isNew(): boolean {
    return this._currentPath === ComponentPath.New;
  }

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
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._examBuilder = new ExamBuilder();
    this._sections = new Array<SectionModel>();
  }

  async ngOnInit() {
    // Need to init form right away for view to load
    this.initExamForm();

    this.identifyPath();
    await this.fetchExam();
  }

  identifyPath(): void {
    this._currentPath = this._router.url.includes(AppRoutesName.newExam)
      ? ComponentPath.New
      : ComponentPath.Edit;
  }

  async fetchExam(): Promise<void> {
    if (this._currentPath === ComponentPath.New) {
      return;
    }

    const id = this._route.snapshot.paramMap.get("id");
    const result = await this._examService.getById(id);

    if (result.statusResponse.status !== StatusCode.Ok) {
      this._errorMessage = "Đã có lỗi xảy ra. Xin hãy thử lại";
      return;
    }

    const exam = result.exam;
    // create Builder
    this._examBuilder = new ExamBuilder(exam._id);

    this._examBuilder
      .withContent(exam.content)
      .withDifficulty(exam.difficulty)
      .withSectionIds(exam.sectionIds)
      .withSections(exam.sections)
      .withSubtitle(exam.subtitle)
      // .withTime(exam.time)
      .withTitle(exam.title);

    this._sections = exam.sections || new Array<SectionModel>();

    // re-init new data
    this.initExamForm();
  }

  initExamForm(): void {
    const exam = this._examBuilder.build();

    this._examForm = this._formBuilder.group({
      title: [exam.title, Validators.required],
      subtitle: [exam.subtitle, Validators.required],
      content: [exam.content, Validators.required],
      // time: [exam.time, Validators.required], not yet support
      difficulty: [exam.difficulty, Validators.required]
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
    this._sections[index].examId = this._examBuilder.build()._id;
  }

  processExam(): ExamModel {
    this._examBuilder
      .withContent(this.content.value)
      .withDifficulty(Number(this.difficulty.value))
      .withSubtitle(this.subtitle.value)
      .withTitle(this.title.value)
      .withSections(this._sections);

    return this._examBuilder.build();
  }

  async submitExam(): Promise<void> {
    switch (this._currentPath) {
      case ComponentPath.New:
        await this.createExam();
        break;
      case ComponentPath.Edit:
        await this.updateExam();
        break;
    }
  }

  async createExam(): Promise<void> {
    const exam = this.processExam();

    const result = await this._examService.insert(exam);

    this._successMessage = this._errorMessage = "";

    if (result.status === StatusCode.Ok) {
      this._successMessage = "Tạo bài thi thành công";
    } else {
      this._errorMessage = result.message;
    }
  }

  async updateExam(): Promise<void> {}
}
