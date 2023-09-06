import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  customers: any;

  constructor(private dataService: DataService,
    public helperService: HelperService) {
      this.getAllCustomers();
  }

  getAllCustomers() {
    this.dataService.getAllCustomers().subscribe({
      next: data => {
        console.log(data);
        this.customers = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }


}
