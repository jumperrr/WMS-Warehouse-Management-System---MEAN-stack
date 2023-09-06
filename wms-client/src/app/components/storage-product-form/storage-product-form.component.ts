import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-storage-product-form',
  templateUrl: './storage-product-form.component.html',
  styleUrls: ['./storage-product-form.component.scss']
})
export class StorageProductFormComponent {
  storageProductID: any;
  storageProduct:any;
  storageProductForm = {
    quantity: null,
    _id: null
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.storageProductID = params.get('id');
      if (this.storageProductID != null && this.storageProductID != undefined) {
        this.getStorageProduct(this.storageProductID);
      }
    });

  }

  getStorageProduct(id: string) {
    this.dataService.getStorageProductById(id).subscribe({
      next: data => {
        this.storageProduct = data;
        this.storageProductForm.quantity = data.quantity;
        console.log(data);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/storageproductlist');
      },
    })
  }

  updatStorageProduct() {
    this.storageProductForm._id = this.storageProductID;
    this.dataService.updateStorageProduct(this.storageProductForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  deleteStorageProduct(id: string) {
    this.dataService.deleteStorageProductById(id).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/storageproductlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
