import { TestBed } from '@angular/core/testing';

import { RespondentDataService } from './respondent-data.service';

describe('RespondentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespondentDataService = TestBed.get(RespondentDataService);
    expect(service).toBeTruthy();
  });
});
