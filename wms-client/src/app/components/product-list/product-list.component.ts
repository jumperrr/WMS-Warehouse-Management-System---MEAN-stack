import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: any;

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllProducts();
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

}
