import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaccurateResponseViewComponent} from './paccurate-response-view.component';

describe('PaccurateResponseViewComponent', () => {
  let component: PaccurateResponseViewComponent;
  let fixture: ComponentFixture<PaccurateResponseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaccurateResponseViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaccurateResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
