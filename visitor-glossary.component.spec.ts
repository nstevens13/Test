import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorGlossaryComponent } from './visitor-glossary.component';

describe('VisitorGlossaryComponent', () => {
  let component: VisitorGlossaryComponent;
  let fixture: ComponentFixture<VisitorGlossaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorGlossaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
