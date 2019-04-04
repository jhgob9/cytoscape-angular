import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopperjsExtensionComponent } from './popperjs-extension.component';

describe('PopperjsExtensionComponent', () => {
  let component: PopperjsExtensionComponent;
  let fixture: ComponentFixture<PopperjsExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopperjsExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopperjsExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
