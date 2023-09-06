import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductListComponent } from './storage-product-list.component';

describe('StorageProductListComponent', () => {
  let component: StorageProductListComponent;
  let fixture: ComponentFixture<StorageProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageProductListComponent]
    });
    fixture = TestBed.createComponent(StorageProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
