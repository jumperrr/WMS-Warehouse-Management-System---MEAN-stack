import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})
export class ManagementPanelComponent {

  constructor(private router: Router,
    public helperService: HelperService) {

  }

  navigateTo(path: string) {
    this.router.navigate(['/' + path]);
  }

}
