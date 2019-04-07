import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaLayoutCompoundComponent } from './cola-layout-compound.component';

describe('ColaLayoutCompoundComponent', () => {
  let component: ColaLayoutCompoundComponent;
  let fixture: ComponentFixture<ColaLayoutCompoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaLayoutCompoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaLayoutCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
