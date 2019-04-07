import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoseBilkentLayoutComponent } from './cose-bilkent-layout.component';

describe('CoseBilkentLayoutComponent', () => {
  let component: CoseBilkentLayoutComponent;
  let fixture: ComponentFixture<CoseBilkentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoseBilkentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoseBilkentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
