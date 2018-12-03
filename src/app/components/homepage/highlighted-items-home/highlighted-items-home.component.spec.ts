import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedItemsHomeComponent } from './highlighted-items-home.component';

describe('HighlightedItemsHomeComponent', () => {
  let component: HighlightedItemsHomeComponent;
  let fixture: ComponentFixture<HighlightedItemsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightedItemsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedItemsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
