import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokyoRailwaysComponent } from './tokyo-railways.component';

describe('TokyoRailwaysComponent', () => {
  let component: TokyoRailwaysComponent;
  let fixture: ComponentFixture<TokyoRailwaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokyoRailwaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokyoRailwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
