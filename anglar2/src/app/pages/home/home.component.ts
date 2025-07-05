import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CartComponent } from '../../shared/module/shared/cart/cart.component';
import { CartService } from '../../core/service/cart.service';
import { PopularPipe } from '../../../core/pipe/popular.pipe';
import { IProducts } from '../../core/apiroot/Interface/http';
import { ProductsService } from '../../core/service/products.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CartComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Inject services for fetching products and managing cart
  constructor(
    private _ProductsService: ProductsService,
    private _cartService: CartService
  ) {}

  // Array to hold images for a slider or gallery
  images: any[] | undefined;

  // Arrays to hold subsets of products
  smallproducts!: IProducts[];
  popularproducts!: IProducts[];

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Initialize images array with product images and metadata
    this.images = [
      {
        itemImageSrc: '../../../assets/pic-1.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: '../../../assets/pic-2.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: '../../../assets/pic-3.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: '../../../assets/pic-4.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
    ];

    // Fetch all products after initializing images
    this.getAllProducts();
  }

  // Fetch all products and process them for display
  getAllProducts(): void {
    this._ProductsService.allProducts().subscribe((response: any) => {
      // Take first 4 products as 'smallproducts'
      this.smallproducts = response.products.slice(0, 4);

      // Map all products to add 'isAddedToCart' flag based on cart status
      this.popularproducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cartService.isAddedToCart(product) || false,
        };
      });
    });
  }
}
