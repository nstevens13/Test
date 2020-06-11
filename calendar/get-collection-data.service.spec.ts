import { TestBed } from '@angular/core/testing';

import { GetCollectionDataService } from './get-collection-data.service';

describe('GetCollectionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCollectionDataService = TestBed.get(GetCollectionDataService);
    expect(service).toBeTruthy();
  });
});
