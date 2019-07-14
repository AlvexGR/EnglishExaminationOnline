import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import {
  QuestionType,
  QuestionModel,
  AnswerChoice
} from "@lib/models/question.model";
import { QuestionBuilder } from "@lib/builders/question.builder";
import { Subscription } from "rxjs";

@Component({
  selector: "app-question-creator",
  templateUrl: "./question-creator.component.html",
  styleUrls: ["./question-creator.component.css"]
})
export class QuestionCreatorComponent implements OnInit, OnDestroy {
  private _questionForm: FormGroup;
  private _questionBuilder: QuestionBuilder;
  private _questionSubscription: Subscription;
  private _index: number;

  get questionForm(): FormGroup {
    return this._questionForm;
  }

  get title(): string {
    let content = this.content.value;
    if (content && content.length > 50) {
      content = content.substring(0, 47) + "...";
    }
    return content;
  }

  get content(): AbstractControl {
    return this._questionForm.get("content");
  }

  get questionType(): AbstractControl {
    return this._questionForm.get("questionType");
  }

  get choiceA(): AbstractControl {
    return this._questionForm.get("choiceA");
  }

  get choiceB(): AbstractControl {
    return this._questionForm.get("choiceB");
  }

  get choiceC(): AbstractControl {
    return this._questionForm.get("choiceC");
  }

  get choiceD(): AbstractControl {
    return this._questionForm.get("choiceD");
  }

  get answer(): AbstractControl {
    return this._questionForm.get("answer");
  }

  @Input()
  set index(value: number) {
    this._index = value;
  }

  get index(): number {
    return this._index;
  }

  @Input()
  set question(value: QuestionModel) {
    this._questionBuilder = new QuestionBuilder(value._id);

    this._questionBuilder
      .withAnswer(value.answer)
      .withChoiceA(value.choiceA)
      .withChoiceB(value.choiceB)
      .withChoiceC(value.choiceC)
      .withChoiceD(value.choiceD)
      .withContent(value.content)
      .withQuestionType(value.questionType);

    this.initQuestionForm();
  }

  @Output() delete = new EventEmitter();

  @Output() update = new EventEmitter<QuestionModel>();

  constructor(private _formBuilder: FormBuilder) {
    this._questionBuilder = new QuestionBuilder();
  }

  ngOnInit() {
    this.initQuestionForm();
    this._questionSubscription = this._questionForm.valueChanges.subscribe(() =>
      this.updateQuestion()
    );
  }

  ngOnDestroy() {
    this._questionSubscription.unsubscribe();
  }

  initQuestionForm(): void {
    const question = this._questionBuilder.build();
    this._questionForm = this._formBuilder.group({
      content: [question.content],
      questionType: [question.questionType || QuestionType.multipleChoice],
      choiceA: [question.choiceA],
      choiceB: [question.choiceB],
      choiceC: [question.choiceC],
      choiceD: [question.choiceD],
      answer: [question.answer]
      // tags: [[]]
    });
  }

  updateQuestion(): void {
    this._questionBuilder
      .withAnswer(Number(this.answer.value))
      .withContent(this.content.value)
      .withChoiceA(this.choiceA.value)
      .withChoiceB(this.choiceB.value)
      .withChoiceC(this.choiceC.value)
      .withChoiceD(this.choiceD.value)
      .withQuestionType(Number(this.questionType.value));
    this.update.emit(this._questionBuilder.build());
  }

  deleteQuestion(): void {
    this.delete.emit();
  }
}
