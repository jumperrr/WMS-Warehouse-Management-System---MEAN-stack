import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userForm: any = {
    firstname: null,
    surname: null,
    email: null,
    password: null,
    roles: [],
    supplier_id: null
  };

  role = null;
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

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    //const { username, email, password } = this.form;
    this.userForm.roles.push(this.role)

     this.authService.register(this.userForm).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    }); 

    console.log(this.userForm);
  }

  test() {
    console.log(this.userForm);

  }

  getAllSuppliers() {
    this.dataService.getAllSuppliers(null).subscribe({
      next: data => {
        console.log(data);
        this.suppliers = data;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }


}
