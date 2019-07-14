import { ExamModel } from "@lib/models/exam.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { BaseRepo } from "./base.repo";
import { SectionRepo } from "./section.repo";
import { QuestionRepo } from "./question.repo";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { QuestionModel } from "@lib/models/question.model";
import { StatusCode } from "@lib/helpers/utility.helper";

export class ExamRepo extends BaseRepo<ExamModel> {
  private _sectionRepo: SectionRepo;
  private _questionRepo: QuestionRepo;
  constructor() {
    super(MongoDbHelper.exams);
    this._sectionRepo = new SectionRepo();
    this._questionRepo = new QuestionRepo();
  }

  async insert(exam: ExamModel): Promise<IStatusResponse> {
    const sections = exam.sections;
    let questions = new Array<QuestionModel>();
    exam.sections.map(section => {
      questions = questions.concat(section.questions);
      section.questions = null;
      return section;
    });
    exam.sections = null;
    const results = await Promise.all([
      super.insertOne(exam),
      this._sectionRepo.insertMany(sections),
      this._questionRepo.insertMany(questions)
    ]);

    for (const result of results) {
      if (result.status === StatusCode.InternalError) {
        return result;
      }
    }

    return {
      status: StatusCode.Ok,
      message: ""
    };
  }

  async delete(id: string): Promise<IStatusResponse> {
    const sectionIds = (await this._sectionRepo.getBy({ examId: id }, 0, {
      _id: 1
    })).docs.map(doc => doc._id);

    const questionsIds = (await this._questionRepo.getBy(
      { sectionId: { $in: sectionIds } },
      0,
      { _id: 1 }
    )).docs.map(doc => doc._id);

    const results = await Promise.all([
      super.deleteById(id),
      this._sectionRepo.deleteMany({ _id: { $in: sectionIds } }),
      this._questionRepo.deleteMany({ _id: { $in: questionsIds } })
    ]);

    for (const result of results) {
      if (result.status === StatusCode.InternalError) {
        return result;
      }
    }

    return {
      status: StatusCode.Ok,
      message: ""
    };
  }
}
