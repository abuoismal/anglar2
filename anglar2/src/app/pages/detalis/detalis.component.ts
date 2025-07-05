import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/service/cart.service';
import { IProducts } from '../../core/apiroot/Interface/http';


@Component({
  selector: 'app-detalis',
  imports: [ButtonModule, RouterLink],
  templateUrl: './detalis.component.html',
  styleUrl: './detalis.component.scss'
})
export class DetalisComponent {
  // Inject ActivatedRoute to get route parameters and data
  // Inject CartService to manage cart operations
  constructor(
    private _activateRoute: ActivatedRoute,
    private _cartService: CartService,
  ) {}

  // Holds the product ID from route parameters
  id: string = '';

  // Holds detailed information about the product
  productDetails!: IProducts;

  // Flag to track if product is added to cart (currently unused)
  isaddtocart: boolean = false;

  // Lifecycle hook runs on component initialization
  ngOnInit(): void {
    // Subscribe to route parameters to get the 'id' parameter
    this._activateRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id'])
    );

    // Load product details from the route data resolver
    this.displayDetails();
  }

  // Fetch product details from route resolved data and add cart status
  displayDetails(): void {
    this._activateRoute.data.subscribe((data: any) => {
      this.productDetails = {
        ...data.details.product,
        // Add a flag to indicate if product is already in cart
        isAddedToCart: this._cartService.isAddedToCart(data.details.product),
      };
    });
  }

  // Add a product to the cart using CartService
  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
