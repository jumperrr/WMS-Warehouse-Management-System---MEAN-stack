import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {
  storageProducts: any;
  products: any;

  filters = {
    product: "",
    storage: ""
  }

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllStorageProducts();
  }

  getAllStorageProducts() {
    let filter = this.setFilters();
    this.dataService.getAllStorageProduct(filter).subscribe({
      next: data => {
        this.storageProducts = data;
        this.getAllProducts()
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllProducts() {
    this.dataService.getAllProducts().subscribe({
      next: data => {
        console.log(data);
        this.products = data;
        this.products.forEach((product: any) => {
          product.totalQty = this.countTotalQty(product._id);
          product.storages = this.storageProducts.data.filter((p:any)=> p.product._id == product._id);
          product.showStorages = false;
        });
        this.products.sort((a:any, b:any) => (a.totalQty < b.totalQty) ? -1 : 1)
        console.log(this.products);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  setFilters() {
    let filters: any = {};

    if (this.filters.product != "") {
      filters.product = this.filters.product;
    }

    if (this.filters.storage != "") {
      filters.storage = this.filters.storage;
    }

    return filters;
  }

  countTotalQty(productID: string) {
    let totalQty = 0;
    let tempArray = this.storageProducts.data.filter((p:any)=> p.product._id == productID);
    if (tempArray.length != 0) {
      tempArray.forEach((element: any) => {
        totalQty += element.quantity;
      });
    }
    return totalQty;
  }
}
