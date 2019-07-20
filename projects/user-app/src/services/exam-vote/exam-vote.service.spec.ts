import { TestBed } from '@angular/core/testing';

import { ExamVoteService } from './exam-vote.service';

describe('ExamVoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamVoteService = TestBed.get(ExamVoteService);
    expect(service).toBeTruthy();
  });
});
