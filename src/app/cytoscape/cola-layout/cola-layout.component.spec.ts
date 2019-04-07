import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaLayoutComponent } from './cola-layout.component';

describe('ColaLayoutComponent', () => {
  let component: ColaLayoutComponent;
  let fixture: ComponentFixture<ColaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
