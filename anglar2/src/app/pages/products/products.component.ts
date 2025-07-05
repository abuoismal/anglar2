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
  // Inject services for fetching products and managing cart
  constructor(
    private _productsService: ProductsService,
    private _cart: CartService
  ) {}

  // Array to hold all products fetched from the service
  allProducts: IProducts[] = [];

  // Search key for filtering products (currently unused in this snippet)
  searchKey: string = '';

  // Lifecycle hook runs on component initialization
  ngOnInit(): void {
    // Fetch all products when component loads
    this.getAllProducts();
  }

  // Fetches all products and marks whether each is added to the cart
  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      // Map through the fetched products
      this.allProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          // Add a new property 'isAddedToCart' to indicate if the product is in cart
          isAddedToCart: this._cart.isAddedToCart(product) || false,
        };
      });
    });
  }
}


