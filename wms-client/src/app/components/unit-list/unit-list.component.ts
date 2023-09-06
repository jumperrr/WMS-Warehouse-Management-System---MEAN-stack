import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent {
  units: any;

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllUnits();
  }

  getAllUnits() {
    this.dataService.getAllUnits().subscribe({
      next: data => {
        this.units = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }
}
