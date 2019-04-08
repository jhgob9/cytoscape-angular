import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeTypesComponent } from './edge-types.component';

describe('EdgeTypesComponent', () => {
  let component: EdgeTypesComponent;
  let fixture: ComponentFixture<EdgeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
