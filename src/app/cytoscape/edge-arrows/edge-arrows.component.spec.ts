import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeArrowsComponent } from './edge-arrows.component';

describe('EdgeArrowsComponent', () => {
  let component: EdgeArrowsComponent;
  let fixture: ComponentFixture<EdgeArrowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeArrowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
