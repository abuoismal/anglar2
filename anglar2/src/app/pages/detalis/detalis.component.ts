import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/service/cart.service';
import { IProducts } from '../../core/apiroot/Interface/http';
import { ProductsService } from '../../core/service/products.service';

@Component({
  selector: 'app-detalis',
  imports: [ButtonModule, RouterLink],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss'
})
export class DetalisComponent {
  constructor(
    private _activateRoute: ActivatedRoute,
    private _cartService: CartService,

  ) {}
  id: string = '';
  productDetails!: IProducts;

  isaddtocart: boolean = false;
  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id'])
    );
    this.displayDetails();
  }
  displayDetails(): void {
    this._activateRoute.data.subscribe((data: any) => {
      this.productDetails = {
       ...data.details.product,
       isAddedToCart: this._cartService.isAddedToCart(data.details.product),
      };
    });
  }
  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
