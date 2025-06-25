import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../apiroot/Interface/http';
import { baseUrl } from '../apiroot/baseUrl';
import { NotifecationsService } from './notifecations.service';


@Injectable({
  providedIn: 'root',
})
export class CartService  {
  constructor(
    private _httpClient: HttpClient,
    private _notifecationsService: NotifecationsService
  ) {}
  getCartCount: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem(' ') ?? '[]') as IProducts[]
    ).length
  );

  addToCart(product: IProducts) {
    const storedCart = localStorage.getItem('cartState');
    const cart: IProducts[] = storedCart ? JSON.parse(storedCart) : [];

    if (!product.isaddtocart) {
      product.isaddtocart = true;
      cart.push(product);
      localStorage.setItem('cartState', JSON.stringify(cart));
      this._notifecationsService.showSuccess('Success', 'Item added to cart');
      this.getCartCount.next(cart.length);
    } else {
 this._notifecationsService.showInfo('info', ' Item already in cart');
    }
  }

  isAddedToCart(product: IProducts): boolean {
    const storedCart = localStorage.getItem('cartState');
    const cartState = storedCart ? JSON.parse(storedCart) : [];
    const isAdded = cartState.some((item: IProducts) => item.id === product.id);
    return isAdded;
  }
}
