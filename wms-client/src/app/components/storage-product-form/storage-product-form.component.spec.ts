import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductFormComponent } from './storage-product-form.component';

describe('StorageProductFormComponent', () => {
  let component: StorageProductFormComponent;
  let fixture: ComponentFixture<StorageProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageProductFormComponent]
    });
    fixture = TestBed.createComponent(StorageProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
