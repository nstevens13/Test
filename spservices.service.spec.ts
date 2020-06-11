import { TestBed } from '@angular/core/testing';

import { SpservicesService } from './spservices.service';

describe('SpservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpservicesService = TestBed.get(SpservicesService);
    expect(service).toBeTruthy();
  });
});
