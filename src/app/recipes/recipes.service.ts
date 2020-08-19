import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe('Strawberry Cheesecake',
      'How to make Strawberry Cheesecake like a boss.',
      'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Strawberry-Cheesecake_EXPS_FT20_3270_F_0221_1.jpg',
      [new Ingredient('Cream', 5),
                new Ingredient('Cheese', 4),
                new Ingredient('Strawberries', 20)
      ],        'red'),
    new Recipe('Blueberry Cheesecake',
      'This is another test',
      'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Contest-Winning-Blueberry-Swirl-Cheesecake_EXPS_MCSMZ17_23020_D01_05_4b.jpg',
      [new Ingredient('Cream', 5),
                new Ingredient('Cheese', 5),
                new Ingredient('Blueberries', 20)],
                'blue'),
  ];
  constructor(private shoppingListService: ShoppingListService,
              private router: Router) { }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    if ((this.recipes.length <= index || index < 0)) {
      console.log('no recipe');
      this.router.navigate(['../']);
    }
    else {
      return this.recipes[index];
    }
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
