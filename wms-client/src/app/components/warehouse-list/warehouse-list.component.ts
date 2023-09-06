import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent {
  warehouses: any;

  constructor(private dataService: DataService,
    private errorHandling: ErrorHandlingService,
    public helperService: HelperService) {
    this.getAllWarehouses();
  }

  getAllWarehouses() {
    this.dataService.getAllWarehouses().subscribe({
      next: data => {
        this.warehouses = data;
      },
      error: err => {
        this.errorHandling.handleHttpErrorResponse(err);
      }
    })
  }
}
