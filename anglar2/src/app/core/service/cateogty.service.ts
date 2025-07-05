import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrlporduct } from '../apiroot/baseUrl';

// Angular service for handling category-related API requests

@Injectable({
  providedIn: 'root'
})
export class CateogtyService {

  constructor(private _HttpClient: HttpClient) {}

  /**
   * Fetch all categories from the API.
   * @returns Observable<any> - List of all categories.
   */
  getAllCategory(): Observable<any> {
    return this._HttpClient.get(`${baseUrlporduct}/category`);
  }

  /**
   * Fetch a specific category by type from the API.
   * @param typeCategory - The type of category to fetch.
   * @returns Observable<any> - The requested category data.
   */
  getSpecificCategory(typeCategory: string): Observable<any> {
    return this._HttpClient.get(`${baseUrlporduct}/category`, {
      params: { type: typeCategory },
    });
  }
}
