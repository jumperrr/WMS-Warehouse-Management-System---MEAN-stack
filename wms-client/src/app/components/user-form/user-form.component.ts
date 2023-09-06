import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  userID: any;

  userForm: any = {
    firstname: null,
    surname: null,
    email: null,
    roles: [],
    _id: null
  };

  userPassword = "";
  supplier_id = "";
  role: any = null;
  rolesToSelect = [
    {
      name: 'Employee',
      value: 'user'
    },
    {
      name: 'Supplier',
      value: 'supplier'
    },
    {
      name: 'Admin',
      value: 'admin'
    }
  ];

  suppliers: any;
  confirmationModal: any;

  constructor(private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    public helperService: HelperService) {
      this.route.paramMap.subscribe(params => {
        this.userID = params.get('id');
        if (this.userID != null && this.userID != undefined && this.userID != 'new') {
          this.getUser(this.userID);
        }
      });
      this.getAllSuppliers();
     }


  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  addUser(): void {
    this.userForm.roles.push(this.role);

    if (this.userPassword.length != 0) {
      this.userForm.password = this.userPassword;
    }

    if (this.supplier_id.length != 0) {
      this.userForm.supplier_id = this.supplier_id;
    }

    this.authService.register(this.userForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/user/' + data.user._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      }
    });
  }

  getAllSuppliers() {
    this.dataService.getAllSuppliers(null).subscribe({
      next: data => {
        this.suppliers = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      }
    })
  }

  getUser(id: string) {
    this.dataService.getUserById(id).subscribe({
      next: data => {
        console.log(data);
        this.userForm.firstname = data.firstname;
        this.userForm.surname = data.surname;
        this.userForm.email = data.email;
        this.userForm.roles = data.roles;
        this.role = data.roles[0].name;
        this.supplier_id = data.company?._id;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/userlist')
      },
    })
  }

  updateUser() {
    if (this.userPassword.length != 0) {
      this.userForm.password = this.userPassword;
    }
    this.userForm._id = this.userID;
    this.dataService.updateUser(this.userForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        console.log(err);
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  deleteUser() {
    this.dataService.deleteUserById(this.userID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/userlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    console.log('test');
    if (this.userID == "new") {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  openModal(id: string) {
    var modalDelationEl = document.getElementById(id);
    this.confirmationModal = new bootstrap.Modal(modalDelationEl, {
      keyboard: true
    });
    this.confirmationModal.show();
  }


}
