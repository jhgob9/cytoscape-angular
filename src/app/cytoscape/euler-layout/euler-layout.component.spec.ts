import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulerLayoutComponent } from './euler-layout.component';

describe('EulerLayoutComponent', () => {
  let component: EulerLayoutComponent;
  let fixture: ComponentFixture<EulerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
