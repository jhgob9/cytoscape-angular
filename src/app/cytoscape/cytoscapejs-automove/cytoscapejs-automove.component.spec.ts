import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CytoscapejsAutomoveComponent } from './cytoscapejs-automove.component';

describe('CytoscapejsAutomoveComponent', () => {
  let component: CytoscapejsAutomoveComponent;
  let fixture: ComponentFixture<CytoscapejsAutomoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CytoscapejsAutomoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CytoscapejsAutomoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
