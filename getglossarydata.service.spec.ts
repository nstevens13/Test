import { TestBed } from '@angular/core/testing';

import { GetglossarydataService } from './getglossarydata.service';

describe('GetglossarydataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetglossarydataService = TestBed.get(GetglossarydataService);
    expect(service).toBeTruthy();
  });
});
