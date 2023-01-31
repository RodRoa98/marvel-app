import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

import { expect, test } from '@jest/globals';
import { HttpClientModule } from '@angular/common/http';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
  });

  test('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
