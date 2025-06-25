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
  constructor(
    private _categoryService: CateogtyService,
    private _activatedRoute: ActivatedRoute
  ) {}
  categoryType: string = '';
  products: IProducts[] = [];
  ngOnInit(): void {
    this.categoryType =
      this._activatedRoute.snapshot.paramMap.get('type') ?? '';
    this.getSpecificCategory(this.categoryType);
  }

  getSpecificCategory(type: string) {
    this._categoryService
      .getSpecificCategory(type)
      .subscribe((next) => (this.products = next.products));
  }
}
