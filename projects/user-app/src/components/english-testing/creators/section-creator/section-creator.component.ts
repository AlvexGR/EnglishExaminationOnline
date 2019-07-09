import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { SectionBuilder } from "@lib/builders/section.builder";
import { SectionModel } from "@lib/models/section.model";
import { Subscription } from "rxjs";
import { QuestionModel } from "@lib/models/question.model";

@Component({
  selector: "app-section-creator",
  templateUrl: "./section-creator.component.html",
  styleUrls: ["./section-creator.component.css"]
})
export class SectionCreatorComponent implements OnInit, OnDestroy {
  private _sectionForm: FormGroup;
  private _sectionBuilder: SectionBuilder;
  private _sectionSubscription: Subscription;
  private _questions: Array<QuestionModel>;
  private _index: number;

  get sectionForm(): FormGroup {
    return this._sectionForm;
  }

  get questions(): Array<QuestionModel> {
    return this._questions;
  }

  get title(): AbstractControl {
    return this._sectionForm.get("title");
  }

  get cutTitle(): string {
    let title = this.title.value;
    if (title.length > 50) {
      title = title.substring(0, 47) + "...";
    }
    return title;
  }

  @Input()
  set index(value: number) {
    this._index = value;
  }

  get index(): number {
    return this._index;
  }

  get sectionId(): string {
    return this._sectionBuilder.build()._id;
  }

  @Output() delete = new EventEmitter();

  @Output() update = new EventEmitter<SectionModel>();

  constructor(private _formBuilder: FormBuilder) {
    this._sectionBuilder = new SectionBuilder();
    this._questions = new Array<QuestionModel>();
  }

  ngOnInit() {
    this.initSectionForm();
    this._sectionSubscription = this._sectionForm.valueChanges.subscribe(() =>
      this.updateSection()
    );
  }

  ngOnDestroy() {
    this._sectionSubscription.unsubscribe();
  }

  initSectionForm(): void {
    this._sectionForm = this._formBuilder.group({
      title: ["", Validators.required]
    });
  }

  deleteSection(): void {
    this.delete.emit();
  }

  updateSection(): void {
    this._sectionBuilder.withTitle(this.title.value);

    this.update.emit(this._sectionBuilder.build());
  }

  addQuestion(): void {
    this._questions.push(new QuestionModel("temp"));
  }

  updateQuestion(index: number, question: QuestionModel): void {
    this.questions[index]._id = question._id;
    this.questions[index].answer = question.answer;
    this.questions[index].choiceA = question.choiceA;
    this.questions[index].choiceB = question.choiceB;
    this.questions[index].choiceC = question.choiceC;
    this.questions[index].choiceD = question.choiceD;
    this.questions[index].content = question.content;
    this.questions[index].questionType = question.questionType;
    this.questions[index].tagIds = question.tagIds;
    this.questions[index].tags = question.tags;
  }

  deleteQuestion(index: number): void {
    this._questions.splice(index, 1);
  }
}
