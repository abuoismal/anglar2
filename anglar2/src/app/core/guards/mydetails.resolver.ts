import { ResolveFn } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

// Resolver to fetch product details based on route 'id' parameter
export const mydetailsResolver: ResolveFn<Observable<any>> = (route, state) => {
  const id = route.paramMap.get('id');
  const productService = inject(ProductsService);
  // If 'id' exists, fetch product details; otherwise, return EMPTY observable
  return id ? productService.getDetails(id) : EMPTY;
};
