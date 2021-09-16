import { TestBed } from '@angular/core/testing';

import { DatagetService } from './dataget.service';

describe('DatagetService', () => {
  let service: DatagetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
