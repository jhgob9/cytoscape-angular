import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CymainComponent } from './cymain.component';

describe('CymainComponent', () => {
  let component: CymainComponent;
  let fixture: ComponentFixture<CymainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CymainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CymainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
