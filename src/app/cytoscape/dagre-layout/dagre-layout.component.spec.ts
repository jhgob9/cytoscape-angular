import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DagreLayoutComponent } from './dagre-layout.component';

describe('DagreLayoutComponent', () => {
  let component: DagreLayoutComponent;
  let fixture: ComponentFixture<DagreLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DagreLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DagreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
