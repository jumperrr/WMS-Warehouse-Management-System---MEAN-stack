import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent {
  storages: any;
  areas: any;
  filteredAreas: any;
  warehouses: any;

  filteredStorages: any = [];

  filters = {
    warehouse_id: "",
    area_id: ""
  }

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllAreas();
    this.getAllWarehouses();
    this.getAllStorages();
  }

  getAllStorages() {
    this.dataService.getAllStorages().subscribe({
      next: data => {
        this.storages = data;
        this.filteredStorages = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllAreas() {
    this.dataService.getAllAreas().subscribe({
      next: data => {
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
    this.filteredStorages = this.storages;
    if (this.filters.warehouse_id.length != 0 && this.filters.area_id.length == 0) {
      this.filteredStorages = this.storages.filter((s: any) => s.area.warehouse._id === this.filters.warehouse_id);
    } else if (this.filters.warehouse_id.length == 0 && this.filters.area_id.length != 0) {
      this.filteredStorages = this.storages.filter((s: any) => s.area._id === this.filters.area_id);
    } else if (this.filters.warehouse_id.length != 0 && this.filters.area_id.length != 0) {
      this.filteredStorages = this.storages.filter((s: any) => s.area._id === this.filters.area_id);
    }
  }

  filterAreas() {
    if (this.filters.warehouse_id.length == 0) {
      this.filteredAreas = this.areas;
    } else {
      this.filteredAreas = this.areas.filter((a: any) => a.warehouse._id === this.filters.warehouse_id);
    }
    this.filter(); 
  }
}
