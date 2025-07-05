import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../apiroot/Interface/http';
import { NotifecationsService } from './notifecations.service';

// Angular service for managing cart operations

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject to keep track of cart item count
  getCartCount: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as IProducts[]
    ).length
  );

  constructor(
    private _httpClient: HttpClient,
    private _notifecationsService: NotifecationsService
  ) {}

  /**
   * Adds a product to the cart if not already added.
   * Updates localStorage, notifies user, and updates cart count.
   * @param product The product to add
   */
  addToCart(product: IProducts): void {
    const storedCart = localStorage.getItem('cartState');
    const cart: IProducts[] = storedCart ? JSON.parse(storedCart) : [];

    // Check if product is already in cart
    if (!this.isAddedToCart(product)) {
      product.isaddtocart = true;
      cart.push(product);
      localStorage.setItem('cartState', JSON.stringify(cart));
      this._notifecationsService.showSuccess('Success', 'Item added to cart');
      this.getCartCount.next(cart.length);
    } else {
      this._notifecationsService.showInfo('Info', 'Item already in cart');
    }
  }

  /**
   * Checks if a product is already added to the cart.
   * @param product The product to check
   * @returns True if product is in cart, false otherwise
   */
  isAddedToCart(product: IProducts): boolean {
    const storedCart = localStorage.getItem('cartState');
    const cartState: IProducts[] = storedCart ? JSON.parse(storedCart) : [];
    return cartState.some((item: IProducts) => item.id === product.id);
  }
}
