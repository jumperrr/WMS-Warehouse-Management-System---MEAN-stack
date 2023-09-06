import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(
      AUTH_API + 'signup',
      {
        email: userData.email,
        password: userData.password,
        firstname: userData.firstname,
        surname: userData.surname,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        roles: userData.roles,
        supplier_id: userData.supplier_id,
        _id: userData._id
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}
