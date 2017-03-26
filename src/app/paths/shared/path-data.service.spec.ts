import { TestBed, inject } from '@angular/core/testing';

import { PathDataService } from './path-data.service';

describe('PathDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathDataService]
    });
  });

  it('should ...', inject([PathDataService], (service: PathDataService) => {
    expect(service).toBeTruthy();
  }));
});
