import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductsHomeComponent } from './featured-products-home.component';

describe('FeaturedProductsHomeComponent', () => {
  let component: FeaturedProductsHomeComponent;
  let fixture: ComponentFixture<FeaturedProductsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedProductsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProductsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
