import {inject, TestBed} from '@angular/core/testing';

import {GrowlService} from './growl.service';

describe('GrowlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowlService]
    });
  });

  it('should be created', inject([GrowlService], (service: GrowlService) => {
    expect(service).toBeTruthy();
  }));
});
