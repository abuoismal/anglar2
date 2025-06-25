import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../apiroot/Interface/http';
import { baseUrl } from '../apiroot/baseUrl';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) { }

  getCartCount(id: string): Observable<any> {
    return this._httpClient.get((`${baseUrl}/my-cart/${id}`)
    );
  }
  addToCart (userdata:{prodcuctid: string; userid :string}): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/add-to-cart`, userdata
    );
  }
  countOfCart: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as IProducts[]
    ).length
  );
}
