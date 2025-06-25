
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
import { ProductsComponent } from "../../../../pages/products/products.component";
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
  constructor(private _cartService: CartService) {}
  isAddedToCart: boolean = false;
  @Input({ required: true }) issmallcard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  @Input() searchKey: string = '';

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
