import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  role: any = "";
  isLoggedIn = false;
  showAdminBoard = false;
  showSupplierBoard = false;
  showUserBoard = false;

  constructor(private router: Router,
    public helperService: HelperService,
    private storageService: StorageService,
    public authService: AuthService) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log( this.isLoggedIn);
    if (this.isLoggedIn) {
      this.role = localStorage.getItem('role');
      this.showAdminBoard = this.role.includes('ROLE_ADMIN');
      this.showSupplierBoard = this.role.includes('ROLE_SUPPLIER');
      this.showUserBoard = this.role.includes('ROLE_USER');
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.helperService.showToast('success', res.message);

        this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    });
  }
}
