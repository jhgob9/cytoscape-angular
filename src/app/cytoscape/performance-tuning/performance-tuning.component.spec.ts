import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTuningComponent } from './performance-tuning.component';

describe('PerformanceTuningComponent', () => {
  let component: PerformanceTuningComponent;
  let fixture: ComponentFixture<PerformanceTuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceTuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
