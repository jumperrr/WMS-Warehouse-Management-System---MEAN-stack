import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private helperService: HelperService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  handleHttpErrorResponse(error: HttpErrorResponse) {
    console.log(error);
    if (error.status == 403) {
      this.helperService.showToast('error', "Unauthorized! Please log in.");
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

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
