import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIconsHomeComponent } from './category-icons-home.component';

describe('CategoryIconsHomeComponent', () => {
  let component: CategoryIconsHomeComponent;
  let fixture: ComponentFixture<CategoryIconsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryIconsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryIconsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
