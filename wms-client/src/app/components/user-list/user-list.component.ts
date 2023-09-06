import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any;
  usersFiltered: any;
  filters = {
    role: ""
  }

  constructor(private dataService: DataService,
    public helperService: HelperService) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.dataService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
        this.usersFiltered = data;
        console.log(data);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  filter() {
    this.usersFiltered = this.users;
    if (this.filters.role.length != 0) {
      this.usersFiltered = this.users.filter((u: any) => u.roles[0].name === this.filters.role);
    } 
  }
}
