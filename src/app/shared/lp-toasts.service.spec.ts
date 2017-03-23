import { TestBed, inject } from '@angular/core/testing';

import { LpToastsService } from './lp-toasts.service';

describe('LpToastsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LpToastsService]
    });
  });

  it('should ...', inject([LpToastsService], (service: LpToastsService) => {
    expect(service).toBeTruthy();
  }));
});
