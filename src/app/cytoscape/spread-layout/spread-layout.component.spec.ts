import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadLayoutComponent } from './spread-layout.component';

describe('SpreadLayoutComponent', () => {
  let component: SpreadLayoutComponent;
  let fixture: ComponentFixture<SpreadLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
