import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public color: string;

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], color: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.color = color;
  }
  setColor(color: string): void {
    this.color = color;
  }
}
