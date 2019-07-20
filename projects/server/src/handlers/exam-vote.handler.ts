import { ExamVoteRepo } from "../repo/exam-vote.repo";
import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { StatusCode } from "@lib/helpers/utility.helper";
import {
  IExamVotesResponse,
  IExamVoteResponse,
  IAction,
  Action
} from "@lib/interfaces/exam-vote.interface";
import { ExamHandler } from "./exam.handler";
import { ILikeAndDislikeResponse } from "@lib/interfaces/exam.interface";

export class ExamVoteHandler {
  private _examVoteRepo: ExamVoteRepo;
  private _examHandler: ExamHandler;
  constructor() {
    this._examVoteRepo = new ExamVoteRepo();
    this._examHandler = new ExamHandler();
  }

  async getAll(): Promise<IExamVotesResponse> {
    const result = await this._examVoteRepo.getBy({});
    return {
      examVotes: result.docs,
      statusResponse: result.statusResponse
    };
  }

  async getById(id: string): Promise<IExamVoteResponse> {
    if (!id) {
      return {
        examVote: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${id}`
        }
      };
    }

    const result = await this._examVoteRepo.getById(id);
    return {
      examVote: result.doc,
      statusResponse: result.statusResponse
    };
  }

  async getAction(examVote: ExamVoteModel): Promise<IAction> {
    const result = await this._examVoteRepo.getBy({
      examId: examVote.examId,
      userId: examVote.userId
    });

    // length must be 0 or 1
    if (
      result.statusResponse.status === StatusCode.InternalError ||
      (result.docs && result.docs.length > 1)
    ) {
      return {
        action: null,
        statusResponse: result.statusResponse
      };
    }

    let action = Action.insert;
    // User has already voted
    if (result.docs.length > 0) {
      // the vote is the same
      if (result.docs[0].vote === examVote.vote) {
        action = Action.delete;
      } else {
        action = Action.update;
      }
    }

    return {
      action,
      statusResponse: {
        status: StatusCode.Ok,
        message: ""
      }
    };
  }

  async insert(examVote: ExamVoteModel): Promise<ILikeAndDislikeResponse> {
    if (!examVote) {
      return {
        like: null,
        dislike: null,
        action: Action.insert,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${examVote}`
        }
      };
    }

    const result = await this._examVoteRepo.insertOne(examVote);
    if (result.status !== StatusCode.Ok) {
      return {
        like: null,
        dislike: null,
        action: Action.insert,
        statusResponse: result
      };
    }

    return await this._examHandler.updateLikeAndDislike(
      examVote.examId,
      examVote.vote,
      Action.insert
    );
  }

  async update(examVote: ExamVoteModel): Promise<ILikeAndDislikeResponse> {
    if (!examVote) {
      return {
        like: null,
        dislike: null,
        action: Action.update,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${examVote}`
        }
      };
    }

    const result = await this._examVoteRepo.updateOne(examVote);
    if (result.status !== StatusCode.Ok) {
      return {
        like: null,
        dislike: null,
        action: Action.update,
        statusResponse: result
      };
    }

    return await this._examHandler.updateLikeAndDislike(
      examVote.examId,
      examVote.vote,
      Action.update
    );
  }

  async delete(examVote: ExamVoteModel): Promise<ILikeAndDislikeResponse> {
    if (!examVote) {
      return {
        like: null,
        dislike: null,
        action: Action.delete,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${examVote}`
        }
      };
    }

    const examId = examVote.examId;
    const vote = examVote.vote;

    const result = await this._examVoteRepo.deleteBy({
      examId: examVote.examId,
      userId: examVote.userId
    });

    if (result.status !== StatusCode.Ok) {
      return {
        like: null,
        dislike: null,
        action: Action.delete,
        statusResponse: result
      };
    }

    return await this._examHandler.updateLikeAndDislike(
      examId,
      vote,
      Action.delete
    );
  }
}
