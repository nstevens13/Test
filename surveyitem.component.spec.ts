import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyitemComponent } from './surveyitem.component';

describe('SurveyitemComponent', () => {
  let component: SurveyitemComponent;
  let fixture: ComponentFixture<SurveyitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
