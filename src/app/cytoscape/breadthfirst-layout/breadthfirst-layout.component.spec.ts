import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadthfirstLayoutComponent } from './breadthfirst-layout.component';

describe('BreadthfirstLayoutComponent', () => {
  let component: BreadthfirstLayoutComponent;
  let fixture: ComponentFixture<BreadthfirstLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadthfirstLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadthfirstLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
