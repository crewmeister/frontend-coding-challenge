import { TestBed } from '@angular/core/testing';

import { WorkforceService } from './workforce.service';

describe('WorkforceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkforceService = TestBed.get(WorkforceService);
    expect(service).toBeTruthy();
  });
});
