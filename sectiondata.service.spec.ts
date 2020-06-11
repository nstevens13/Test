import { TestBed } from '@angular/core/testing';

import { SectiondataService } from './sectiondata.service';

describe('SectiondataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectiondataService = TestBed.get(SectiondataService);
    expect(service).toBeTruthy();
  });
});
