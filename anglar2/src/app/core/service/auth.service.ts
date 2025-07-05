import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ilogin, Iregister } from '../apiroot/Interface/http';
import { baseUrl } from '../apiroot/baseUrl';

/**
 * AuthService handles user authentication and authorization logic.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  /**
   * Registers a new user.
   * @param registerData User registration data
   * @returns Observable of the HTTP response
   */
  register(registerData: Iregister): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users`, registerData);
  }

  /**
   * Logs in a user.
   * @param loginuser User login credentials
   * @returns Observable of the HTTP response
   */
  login(loginuser: ilogin): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/auth`, loginuser);
  }

  /**
   * Checks if the user is authorized (token exists in localStorage).
   * @returns true if authorized, false otherwise
   */
  authorized(): boolean {
    return localStorage.getItem('token') != null;
  }

  /**
   * Logs out the current user.
   * @returns Observable of the HTTP response
   */
  logout(): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/logout`, {});
  }

  /**
   * Checks if the user is authenticated.
   * (Implementation can be expanded as needed)
   * @returns true if authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return this.authorized();
  }
}
