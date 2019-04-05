import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoseLayoutComponent } from './cose-layout.component';

describe('CoseLayoutComponent', () => {
  let component: CoseLayoutComponent;
  let fixture: ComponentFixture<CoseLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoseLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
