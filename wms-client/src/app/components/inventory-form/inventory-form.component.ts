import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent {
  products: any;
  storages: any;

  storageProductForm = {
    quantity: null,
    product_id: null,
    storage_id: null
  }

  constructor(private dataService: DataService,
    private router: Router,
    public helperService: HelperService) {
    this.getAllProducts();
    this.getAllStorages();
  }

  getAllProducts() {
    this.dataService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllStorages() {
    this.dataService.getAllStorages().subscribe({
      next: data => {
        this.storages = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  addStorageProduct() {
    console.log(this.storageProductForm);
    this.dataService.addStorageProduct(this.storageProductForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/inventory')
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }


}
