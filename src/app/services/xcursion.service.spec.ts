import { TestBed } from '@angular/core/testing';

import { XcursionService } from './xcursion.service';

describe('XcursionService', () => {
  let service: XcursionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XcursionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
