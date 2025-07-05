import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../core/apiroot/Interface/http';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';


// CartComponent: Displays and manages the shopping cart

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  // Holds all products currently in the cart
  allCartProducts: IProducts[] = [];

  // On component initialization, load cart products from localStorage
  ngOnInit(): void {
    const cartState = localStorage.getItem('cartState');
    if (cartState !== null) {
      this.allCartProducts = JSON.parse(cartState);
    }
  }

  // Clears the cart both in localStorage and in the component state
  clearCart(): void {
    localStorage.removeItem('cartState');
    this.allCartProducts = [];
  }
}

