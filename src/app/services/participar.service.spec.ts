import { TestBed } from '@angular/core/testing';

import { ParticiparService } from './participar.service';

describe('ParticiparService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParticiparService = TestBed.get(ParticiparService);
    expect(service).toBeTruthy();
  });
});
