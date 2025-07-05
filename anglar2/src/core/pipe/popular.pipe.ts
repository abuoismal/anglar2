import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../../app/core/apiroot/Interface/http';

@Pipe({
  name: 'popular',
  standalone: true
})
export class PopularPipe implements PipeTransform {

  // This method filters the products array to return only those marked as popular
  transform(products: IProducts[]): IProducts[] {
    return products?.filter((products) => products?.popular === true);
  }

}

