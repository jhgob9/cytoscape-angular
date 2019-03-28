import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColajsGraphComponent } from './colajs-graph.component';

describe('ColajsGraphComponent', () => {
  let component: ColajsGraphComponent;
  let fixture: ComponentFixture<ColajsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColajsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColajsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
