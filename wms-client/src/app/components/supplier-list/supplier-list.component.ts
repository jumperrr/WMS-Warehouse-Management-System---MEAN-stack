import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent {
  suppliers: any;

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.dataService.getAllSuppliers(null).subscribe({
      next: data => {
        this.suppliers = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }
}


