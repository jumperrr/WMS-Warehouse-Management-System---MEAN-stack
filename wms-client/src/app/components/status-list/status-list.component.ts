import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent {
  statuses: any;

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllStatuses();
  }

  getAllStatuses() {
    this.dataService.getAllStatuses().subscribe({
      next: data => {
        this.statuses = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }
}
