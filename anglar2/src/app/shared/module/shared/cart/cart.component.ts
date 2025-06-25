
import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { IProducts } from '../../../../core/apiroot/Interface/http';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/service/cart.service';
import { UserdataService } from '../../../../../service/userdata.service';
import { NotifecationsService } from '../../../../core/service/notifecations.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private _cartService: CartService,
    private _notfie: NotifecationsService

  ) { }
  isaddtocart: boolean = false;

  @Input({ required: true }) issmallcard: boolean = false;
  @Input({ required: true }) Products!:IProducts[]

  addToCart(prodcuctid: string) {
    const userid = localStorage.getItem('token') ?? '';
    this._cartService.addToCart({ userid, prodcuctid }).subscribe((next) => {
      this._notfie.showSuccess('success','Product added to cart successfully');
      this._cartService.countOfCart.next(
        JSON.parse(localStorage.getItem('cartstate') ?? '{}').length + 1
      );
      this.isaddtocart = true;

      const storedcart = localStorage.getItem('cartstate');
      const cartstate = storedcart ? JSON.parse(storedcart) : {};

      cartstate[prodcuctid] = true;
      localStorage.setItem('cartstate', JSON.stringify(cartstate));
    });
  }
  // ngOnInit(): void {
  //   if (localStorage.getItem('cartState') !== null) {
  //     this.allCartProducts = JSON.parse(
  //       localStorage.getItem('cartState') || ''
  //     );
  //   }
  // }
  // clearCart(): void {
  //   localStorage.removeItem('cartState');
  //   this.allCartProducts = [];
  // }
}
