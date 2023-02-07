import { TestBed } from '@angular/core/testing';

import { UserCheckinService } from './user-checkin.service';

describe('UserCheckinService', () => {
  let service: UserCheckinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCheckinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
