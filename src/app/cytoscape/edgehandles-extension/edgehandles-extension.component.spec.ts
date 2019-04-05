import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgehandlesExtensionComponent } from './edgehandles-extension.component';

describe('EdgehandlesExtensionComponent', () => {
  let component: EdgehandlesExtensionComponent;
  let fixture: ComponentFixture<EdgehandlesExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgehandlesExtensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgehandlesExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
