import { TestBed } from '@angular/core/testing';

import { GaleryPhotosService } from './galery-photos.service';

describe('GaleryPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaleryPhotosService = TestBed.get(GaleryPhotosService);
    expect(service).toBeTruthy();
  });
});
