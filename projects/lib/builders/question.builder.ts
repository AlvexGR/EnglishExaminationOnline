import { QuestionModel, QuestionType, AnswerChoice } from "@lib/models/question.model";
import { TagModel } from '@lib/models/tag.model';

export class QuestionBuilder {
  private _question: QuestionModel;
  constructor(id?: string) {
    this._question = new QuestionModel(id);
  }

  withIndex(index: number): QuestionBuilder {
    this._question.index = index;
    return this;
  }

  withContent(content: string): QuestionBuilder {
    this._question.content = content;
    return this;
  }

  withQuestionType(type: QuestionType): QuestionBuilder {
    this._question.questionType = type;
    return this;
  }

  withChoiceA(choiceA: string): QuestionBuilder {
    this._question.choiceA = choiceA;
    return this;
  }

  withChoiceB(choiceB: string): QuestionBuilder {
    this._question.choiceB = choiceB;
    return this;
  }

  withChoiceC(choiceC: string): QuestionBuilder {
    this._question.choiceC = choiceC;
    return this;
  }

  withChoiceD(choiceD: string): QuestionBuilder {
    this._question.choiceD = choiceD;
    return this;
  }

  withAnswer(answer: AnswerChoice): QuestionBuilder {
    this._question.answer = answer;
    return this;
  }

  withSectionId(id: string): QuestionBuilder {
    this._question.sectionId = id;
    return this;
  }

  withTags(tags: Array<TagModel>): QuestionBuilder {
    this._question.tags = tags;
    return this;
  }

  withTagIds(ids: Array<string>): QuestionBuilder {
    this._question.tagIds = ids;
    return this;
  }

  build(): QuestionModel {
    return this._question;
  }
}
