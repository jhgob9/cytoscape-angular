import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundNodesComponent } from './compound-nodes.component';

describe('CompoundNodesComponent', () => {
  let component: CompoundNodesComponent;
  let fixture: ComponentFixture<CompoundNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
