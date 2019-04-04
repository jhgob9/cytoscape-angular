import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperjsExtensionTippyjsTooltipsComponent } from './popperjs-extension-tippyjs-tooltips.component';

describe('PopperjsExtensionTippyjsTooltipsComponent', () => {
  let component: PopperjsExtensionTippyjsTooltipsComponent;
  let fixture: ComponentFixture<PopperjsExtensionTippyjsTooltipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopperjsExtensionTippyjsTooltipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperjsExtensionTippyjsTooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
