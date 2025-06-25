import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ilogin, Iregister } from '../apiroot/Interface/http';
import { baseUrl } from '../apiroot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static authorized() {
    throw new Error('Method not implemented.');
  }
  AuthService() {
    throw new Error('Method not implemented.');
  }
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }

  constructor(private _httpClient: HttpClient) { }



  register(registerData: Iregister): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users`, registerData)
  }

  login(loginuser: ilogin): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/auth`, loginuser);
  }
  authorized(): boolean{
    if (localStorage.getItem('token')!=null) {
      return true;
    }else return false;
  }
  logout():Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/logout`, {});
  }
}
