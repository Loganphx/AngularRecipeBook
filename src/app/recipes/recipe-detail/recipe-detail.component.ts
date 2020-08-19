import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
   recipe: Recipe;
    id: number;
    subscription: Subscription;

  constructor(private recipeService: RecipesService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activeRoute.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        if (isNaN(this.id)) {
          this.router.navigate(['../']);
        }
        this.recipe = this.recipeService.getRecipe(this.id);
      });
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
