import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleLayoutComponent } from './circle-layout.component';

describe('CircleLayoutComponent', () => {
  let component: CircleLayoutComponent;
  let fixture: ComponentFixture<CircleLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
