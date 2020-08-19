import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {LoggingService} from '../../services/logging.service';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private loggingService: LoggingService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    if (ingName !== '') {
      if (ingAmount === '' || ingAmount === 0)
      {
        const newIngredient = new Ingredient(ingName, 1);
        this.shoppingListService.addIngredient(newIngredient);
        this.loggingService.logItemAdded(ingName, 1);
      }
      else
      {
      const newIngredient = new Ingredient(ingName, ingAmount);
        this.shoppingListService.addIngredient(newIngredient);
        this.loggingService.logItemAdded(ingName, ingAmount);
      }
    }
    else { this.loggingService.logNoItemInputted(); }

  }
}
