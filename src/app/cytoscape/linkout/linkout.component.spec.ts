import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkoutComponent } from './linkout.component';

describe('LinkoutComponent', () => {
  let component: LinkoutComponent;
  let fixture: ComponentFixture<LinkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
