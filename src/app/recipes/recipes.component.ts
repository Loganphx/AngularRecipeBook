import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipesService} from './recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipesService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onLoadRecipes(): void {
    this.router.navigate(['/recipes']);
    // this.router.navigate(['recipes'], {relativeTo: this.activeRoute );
  }

}
