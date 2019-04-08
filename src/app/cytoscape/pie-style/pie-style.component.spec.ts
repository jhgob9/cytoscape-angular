import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieStyleComponent } from './pie-style.component';

describe('PieStyleComponent', () => {
  let component: PieStyleComponent;
  let fixture: ComponentFixture<PieStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
