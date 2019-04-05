import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentricLayoutComponent } from './concentric-layout.component';

describe('ConcentricLayoutComponent', () => {
  let component: ConcentricLayoutComponent;
  let fixture: ComponentFixture<ConcentricLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentricLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentricLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
