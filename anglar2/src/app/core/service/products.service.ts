import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrlporduct} from './../apiroot/baseUrl'
// import { baseUrlporduct } from './../apiroot/baseUrl';


// ProductsService handles all product-related HTTP requests

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Fetch all products from the API
   * @returns Observable<any>
   */
  allProducts(): Observable<any> {
    return this._httpClient.get(`${baseUrlporduct}`);
  }

  /**
   * Fetch product details by ID from the API
   * @param id - Product ID
   * @returns Observable<any>
   */
  getDetails(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrlporduct}/${id}`);
  }
}

