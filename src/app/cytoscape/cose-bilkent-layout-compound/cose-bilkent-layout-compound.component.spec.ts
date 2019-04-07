import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoseBilkentLayoutCompoundComponent } from './cose-bilkent-layout-compound.component';

describe('CoseBilkentLayoutCompoundComponent', () => {
  let component: CoseBilkentLayoutCompoundComponent;
  let fixture: ComponentFixture<CoseBilkentLayoutCompoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoseBilkentLayoutCompoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoseBilkentLayoutCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
