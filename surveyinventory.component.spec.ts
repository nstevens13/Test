import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyinventoryComponent } from './surveyinventory.component';

describe('SurveyinventoryComponent', () => {
  let component: SurveyinventoryComponent;
  let fixture: ComponentFixture<SurveyinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
