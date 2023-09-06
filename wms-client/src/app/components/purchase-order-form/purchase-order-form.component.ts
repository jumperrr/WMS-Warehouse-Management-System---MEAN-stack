import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.scss']
})
export class PurchaseOrderFormComponent {
  orderID: any;
  productID: any;
  products: any;
  statuses: any = [];
  suppliers: any = [];
  suppliersFiltered: any = [];

  orderForm: any = {
    supplier: null,
    deliveryDate: null,
    products: [{
      product: "",
      quantity: null
    }],
    status: '64ed13179e104f9f4b4370a0',
    _id: null
  }

  filters = {
    product: "",
    supplier: ""
  }

  confirmationModal: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private dataService: DataService) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.productID = queryParams.get('product');
      if (this.productID != null && this.productID != undefined) {
        this.orderForm.products[0].product = this.productID
      }
    })
    this.route.paramMap.subscribe(params => {
      this.orderID = params.get('id');
      if (this.orderID != null && this.orderID != undefined && this.orderID != 'new') {
        this.getPurchaseOrder(this.orderID);
      }
    });

    this.getAllSuppliers();
    this.getAllProducts();
    this.getAllStatuses();
  }

  getPurchaseOrder(id: string) {
    this.dataService.getPurchaseOrderById(id).subscribe({
      next: data => {
        this.orderForm.supplier = data.supplier._id;
        let date = new Date (data.deliveryDate);
        this.orderForm.deliveryDate = date.getFullYear() + "-" + ('0' + date.getMonth()).slice(-2) + "-" +  ('0' + date.getDate()).slice(-2)
        this.orderForm.products[0].product = data.products[0].product._id;
        this.orderForm.products[0].quantity = data.products[0].quantity;
        this.orderForm.status_id = data.status;
        console.log(this.orderForm);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/purchaseorderlist')
      },
    })
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

  getAllSuppliers() {
    let filter = this.setFilters();
    this.dataService.getAllSuppliers(filter).subscribe({
      next: data => {
        this.suppliers = data;
        this.filterSuppliers();
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllStatuses() {
    this.dataService.getAllStatuses().subscribe({
      next: data => {
        this.statuses = data;
        console.log(this.statuses);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  deletePurchaseOrder() {
    this.dataService.deletePurchaseOrderById(this.orderID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/purchaseorderlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  updatePurchaseOrder() {
    this.orderForm._id = this.orderID;
    this.dataService.updatePurchaseOrder(this.orderForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addPurchaseOrder() {
    console.log(this.orderForm);
    this.dataService.addPurchaseOrder(this.orderForm).subscribe({
      next: data => {
        console.log(data);
        this.helperService.showToast('success', data.message);
        this.navigateTo('/purchaseorder/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }


  onSubmit() {
    if (this.orderID == "new") {
      this.addPurchaseOrder();
    } else {
      this.updatePurchaseOrder();
    }

    console.log(this.orderForm.products[0].product);

  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  setFilters() {
    let filters: any = {};

    if (this.filters.product != "") {
      filters.product = this.filters.product;
    }

    if (this.filters.supplier != "") {
      filters.storage = this.filters.supplier;
    }

    return filters;
  }

  filterSuppliers() {
    this.suppliersFiltered = [];
    this.suppliers.forEach((supplier: any) => {
      let s = supplier.products.filter((p: any) => p.product?._id == this.orderForm.products[0].product);
      if (s.length != 0) {
        this.suppliersFiltered.push(supplier);
      }
    });
  }

}
