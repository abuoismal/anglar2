import { Component } from '@angular/core';
import { CateogtyService } from '../../core/service/cateogty.service';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../core/apiroot/Interface/http';
import { CartComponent } from '../../shared/module/shared/cart/cart.component';

@Component({
  selector: 'app-specific-c',
  imports: [CartComponent],
  templateUrl: './specific-c.component.html',
  styleUrl: './specific-c.component.scss'
})
export class SpecificCComponent {
  // Inject the category service and activated route for fetching data and route parameters
  constructor(
    private _categoryService: CateogtyService,
    private _activatedRoute: ActivatedRoute
  ) {}

  // Property to hold the current category type from the route parameter
  categoryType: string = '';

  // Array to hold the list of products fetched from the service
  products: IProducts[] = [];

  // Lifecycle hook runs after component initialization
  ngOnInit(): void {
    // Retrieve the 'type' parameter from the current route snapshot
    this.categoryType = this._activatedRoute.snapshot.paramMap.get('type') ?? '';

    // Call method to fetch products for the specific category type
    this.getSpecificCategory(this.categoryType);
  }

  // Method to fetch specific category data from the service
  getSpecificCategory(type: string) {
    this._categoryService
      .getSpecificCategory(type)
      // Subscribe to the observable and update the products array when data arrives
      .subscribe((next) => (this.products = next.products));
  }
}
