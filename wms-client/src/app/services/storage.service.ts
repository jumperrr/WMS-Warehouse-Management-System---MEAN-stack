import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  userRole: any = null;
  user: any = null;

  constructor() {
    this.userRole = localStorage.getItem('role');
    this.user = localStorage.getItem('user');
   }

  clean(): void {
    window.sessionStorage.clear();
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem('role', user.roles);
    localStorage.setItem('user', user.email)
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    } else if (localStorage.getItem('user') != undefined) {
      return true;
    } else {
      return false;
    }
  }
}
