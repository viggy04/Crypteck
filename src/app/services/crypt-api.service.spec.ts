import { TestBed } from '@angular/core/testing';

import { CryptApiService } from './crypt-api.service';

describe('CryptApiService', () => {
  let service: CryptApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
