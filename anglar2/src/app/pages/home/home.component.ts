import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CartComponent } from '../../shared/module/shared/cart/cart.component';
import { CartService } from '../../core/service/cart.service';
import { PopularPipe } from '../../../core/popular/popular.pipe';
import { IProducts } from '../../core/apiroot/Interface/http';
import { UserdataService } from '../../../service/userdata.service';
import { ProductsService } from '../../core/service/products.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CartComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _ProductsService: ProductsService,

){}
  images: any[] | undefined;
  smallproducts!: IProducts[];
  popularproducts!: IProducts[];

  ngOnInit() {
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
    this.getAllProducts();
  }

  getAllProducts(): void {
    const storedcart = localStorage.getItem('cartstate');
    const cartstate = storedcart ? JSON.parse(storedcart) : {};

    this._ProductsService.allProducts().subscribe((response:IProducts[]) => {
      this.smallproducts = response.slice(0, 4);
      this.popularproducts = response.map((product) => {
        return {
          ...product,
          isAddedToCart:cartstate[product._id],
        };
      })

    });
  }

}
