import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IProducts } from '../../../../core/apiroot/Interface/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/service/cart.service';
import { EmptyComponent } from '../../../empty/empty.component';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, MessagesModule, EmptyComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  // Injecting CartService to handle cart operations
  constructor(private _cartService: CartService) {}

  // Flag to check if an item was added to the cart
  isAddedToCart: boolean = false;

  // Input to check if the card style is small (required)
  @Input({ required: true }) issmallcard: boolean = false;

  // Input array of product data (required)
  @Input({ required: true }) Products!: IProducts[];

  // Input to receive a search keyword
  @Input() searchKey: string = '';

  // Method to add a product to the cart
  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
