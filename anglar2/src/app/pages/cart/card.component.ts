import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../core/apiroot/Interface/http';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgClass } from '@angular/common';
import { Tag, TagModule } from 'primeng/tag';
import { ProductsService } from '../../core/service/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent   {
  allCartProducts: IProducts[] = [];

  ngOnInit(): void {
    if (localStorage.getItem('cartState') !== null) {
      this.allCartProducts = JSON.parse(
        localStorage.getItem('cartState') || ''
      );
    }
  }
  clearCart(): void {
    localStorage.removeItem('cartState');
    this.allCartProducts = [];
  }
}

