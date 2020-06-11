import { TestBed } from '@angular/core/testing';

import { SurveydataService } from './surveydata.service';

describe('SurveydataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveydataService = TestBed.get(SurveydataService);
    expect(service).toBeTruthy();
  });
});
