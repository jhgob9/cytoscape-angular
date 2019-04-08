import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedBfsComponent } from './animated-bfs.component';

describe('AnimatedBfsComponent', () => {
  let component: AnimatedBfsComponent;
  let fixture: ComponentFixture<AnimatedBfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedBfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedBfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
