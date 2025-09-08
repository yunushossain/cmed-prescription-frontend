import { TestBed } from '@angular/core/testing';

import { RxService } from './rx.service';

describe('RxService', () => {
  let service: RxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
