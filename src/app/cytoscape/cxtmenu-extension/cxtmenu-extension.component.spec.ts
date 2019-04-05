import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CxtmenuExtensionComponent } from './cxtmenu-extension.component';

describe('CxtmenuExtensionComponent', () => {
  let component: CxtmenuExtensionComponent;
  let fixture: ComponentFixture<CxtmenuExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxtmenuExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CxtmenuExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
