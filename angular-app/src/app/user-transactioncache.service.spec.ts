import { TestBed } from '@angular/core/testing';

import { UserTransactioncacheService } from './user-transactioncache.service';

describe('UserTransactioncacheService', () => {
  let service: UserTransactioncacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTransactioncacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
