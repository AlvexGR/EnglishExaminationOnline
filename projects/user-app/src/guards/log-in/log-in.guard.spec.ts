import { TestBed, async, inject } from '@angular/core/testing';

import { LogInGuard } from './log-in.guard';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogInGuard]
    });
  });

  it('should ...', inject([LogInGuard], (guard: LogInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
