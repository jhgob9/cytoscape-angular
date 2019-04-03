import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokyoRailwaysDialogComponent } from './tokyo-railways-dialog.component';

describe('TokyoRailwaysDialogComponent', () => {
  let component: TokyoRailwaysDialogComponent;
  let fixture: ComponentFixture<TokyoRailwaysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokyoRailwaysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokyoRailwaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
