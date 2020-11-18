import { TestBed } from '@angular/core/testing';

import { AvaliacaoAppService } from './avaliacao-app.service';

describe('AvaliacaoAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvaliacaoAppService = TestBed.get(AvaliacaoAppService);
    expect(service).toBeTruthy();
  });
});
