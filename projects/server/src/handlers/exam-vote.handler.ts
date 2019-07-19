import { ExamVoteRepo } from "../repo/exam-vote.repo";
import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import {
  IExamVotesResponse,
  IExamVoteResponse
} from "@lib/interfaces/exam-vote.interface";

export class ExamVoteHandler {
  private _examVoteRepo: ExamVoteRepo;
  constructor() {
    this._examVoteRepo = new ExamVoteRepo();
  }

  async getAll(): Promise<IExamVotesResponse> {
    const result = await this._examVoteRepo.getBy({});
    return {
      examVotes: result.docs,
      statusResponse: result.statusResponse
    };
  }

  async getById(id: string): Promise<IExamVoteResponse> {
    const result = await this._examVoteRepo.getById(id);
    return {
      examVote: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async insert(examVote: ExamVoteModel): Promise<IStatusResponse> {
    return await this._examVoteRepo.insertOne(examVote);
  }

  async update(examVote: ExamVoteModel): Promise<IStatusResponse> {
    return await this._examVoteRepo.updateOne(examVote);
  }

  async delete(id: string): Promise<IStatusResponse> {
    return await this._examVoteRepo.deleteById(id);
  }
}
