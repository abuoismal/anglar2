import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../../app/core/apiroot/Interface/http';


@Pipe({
  name: 'searchName',
  standalone: true,
})
export class SearchNamePipe implements PipeTransform {

  // This method filters the products array based on the search keyword
  transform(products: IProducts[], searchKey: string): IProducts[] {
    return products.filter((products) =>
      products.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}

