import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent {
  orders: any;

  filters = {
    supplier: ""
  }

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllPurchaseOrders();
  }

  getAllPurchaseOrders() {
    let filter = this.setFilters();
    this.dataService.getAllPurchaseOrder(filter).subscribe({
      next: data => {
        this.orders = data;
        console.log(this.orders);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  setFilters() {
    let filters: any = {};

    if (this.filters.supplier != "") {
      filters.storage = this.filters.supplier;
    }

    return filters;
  }
}
