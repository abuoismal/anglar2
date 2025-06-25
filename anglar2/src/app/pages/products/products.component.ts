
import { Component } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { CartService } from '../../core/service/cart.service';
import { IProducts } from '../../core/apiroot/Interface/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CartComponent } from '../../shared/module/shared/cart/cart.component';
import { SearchNamePipe } from '../../../core/pipe/SearchNamePipe';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';



@Component({
  selector: 'app-products',
  imports: [ CartComponent,
    InputTextModule,
    FormsModule,
    SearchNamePipe,InputIcon, IconField, InputTextModule, ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(
    private _productsService: ProductsService,
    private _cart: CartService
  ) {}
  allProducts: IProducts[] = [];
  searchKey: string = '';

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      this.allProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cart.isAddedToCart(product) || false,
        };
      });
    });
  }
}

