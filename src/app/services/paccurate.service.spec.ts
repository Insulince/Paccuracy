import {inject, TestBed} from "@angular/core/testing";

import {PaccurateService} from "./paccurate.service";

describe("PaccurateService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaccurateService]
    });
  });

  it("should be created", inject([PaccurateService], (service: PaccurateService) => {
    expect(service).toBeTruthy();
  }));
});
