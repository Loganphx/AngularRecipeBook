import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [ new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
  ifIngredientExists(ingredient: Ingredient): boolean {
    for (let i of this.ingredients) {
      if(i.name.toLowerCase() === ingredient.name.toLowerCase()) {
        i.amount += ingredient.amount;
        return true;
      }
    }
    return false;
  }
  addIngredient(ingredient: Ingredient) {
    if (!this.ifIngredientExists(ingredient)) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      if (!this.ifIngredientExists(ingredient)) {
        this.ingredients.push(ingredient);
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
