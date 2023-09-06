import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-storage-product-list',
  templateUrl: './storage-product-list.component.html',
  styleUrls: ['./storage-product-list.component.scss']
})
export class StorageProductListComponent {
  storageProducts: any;
  storageProductsFiltered: any;


  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllStorageProducts();
  }

  getAllStorageProducts() {
    let filter = this.setFilters();
    this.dataService.getAllStorageProduct(filter).subscribe({
      next: data => {
        this.storageProducts = data.data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  setFilters() {
    let filters: any = {};

    return filters;
  }
}
