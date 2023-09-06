import { Injectable } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  darkMode = false;
  toastMessage = "";

  constructor() {
    if (localStorage.getItem('dark-mode') != null) {
      let darkModeTemp = JSON.parse(localStorage.getItem('dark-mode')!);
      this.darkMode = darkModeTemp;
      this.darkModeSwitch();
    }
  }

  darkModeSwitch() {
    if (this.darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      localStorage.setItem("dark-mode", 'true');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light')
      localStorage.setItem("dark-mode", 'false');
    }
  }

  showToast(type: any, text: string) {
    this.toastMessage = text;

    if (type == "success") {
      let toastSuccessEl = document.getElementById('toastSuccess');
      let toastSuccess = new bootstrap.Toast(toastSuccessEl);
      toastSuccess.show()
    } else {
      let toastErrorEl = document.getElementById('toastError');
      let toastError = new bootstrap.Toast(toastErrorEl);
      toastError.show()
    }
  }



}
