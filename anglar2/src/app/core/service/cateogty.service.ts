import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrlporduct } from '../apiroot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CateogtyService {

  constructor(private _HttpClient: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this._HttpClient.get(`${baseUrlporduct}/category`);
  }
  getSpecificCategory(typeCategory: string): Observable<any> {
    return this._HttpClient.get(`${baseUrlporduct}/category`, {
      params: { type: typeCategory },
    });
  }
}
