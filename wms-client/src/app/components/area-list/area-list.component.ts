import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent {
  areas: any;
  warehouses: any;
  filteredAreas: any = [];

  filters = {
    warehouse_id: ""
  }

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllAreas();
    this.getAllWarehouses();
  }

  getAllAreas() {
    this.dataService.getAllAreas().subscribe({
      next: data => {
        console.log(data);
        this.areas = data;
        this.filteredAreas = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllWarehouses() {
    this.dataService.getAllWarehouses().subscribe({
      next: data => {
        this.warehouses = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  filter() {
    if (this.filters.warehouse_id.length == 0) {
      this.filteredAreas = this.areas;
    } else {
      this.filteredAreas = this.areas.filter((a: any) => a.warehouse._id === this.filters.warehouse_id);
    }
  }
}
