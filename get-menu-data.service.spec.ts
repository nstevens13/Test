import { TestBed } from '@angular/core/testing';

import { GetMenuDataService } from './get-menu-data.service';

describe('GetMenuDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMenuDataService = TestBed.get(GetMenuDataService);
    expect(service).toBeTruthy();
  });
});
