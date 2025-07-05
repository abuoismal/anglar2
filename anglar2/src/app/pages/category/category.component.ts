import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CateogtyService } from '../../core/service/cateogty.service';

// CategoryComponent: Displays and manages categories

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  // Holds all category names
  allCategory: string[] = [];

  constructor(private _categoryService: CateogtyService) {}

  // Lifecycle hook: Called after component initialization
  ngOnInit(): void {
    this.displayAllCategory();
  }

  // Fetches all categories from the service and updates allCategory
  displayAllCategory(): void {
    this._categoryService
      .getAllCategory()
      .subscribe((next) => (this.allCategory = next.categories));
  }

  // Returns the image path for a given category type
  getImageCategory(type: string): string {
    return `./assets/categories/${type}.jpg`;
  }
}
