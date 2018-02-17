import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaccurateRequestFormComponent } from './paccurate-request-form.component';

describe('PaccurateRequestFormComponent', () => {
  let component: PaccurateRequestFormComponent;
  let fixture: ComponentFixture<PaccurateRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaccurateRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaccurateRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
