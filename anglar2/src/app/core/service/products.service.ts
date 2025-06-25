import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl} from './../apiroot/baseUrl'
// import { baseUrlporduct } from './../apiroot/baseUrl';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  allProducts(): Observable<any> {
    return this._httpClient.get(`${baseUrl}/get`);
  }

  // getDetails(id: string): Observable<any> {
  //   return this._httpClient.get(`${baseUrl}/${id}`);
  // }
}

