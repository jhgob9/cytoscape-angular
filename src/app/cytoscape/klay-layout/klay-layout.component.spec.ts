import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlayLayoutComponent } from './klay-layout.component';

describe('KlayLayoutComponent', () => {
  let component: KlayLayoutComponent;
  let fixture: ComponentFixture<KlayLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlayLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
