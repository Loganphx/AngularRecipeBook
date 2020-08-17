import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {LoggingService} from '../../services/logging.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private loggingService: LoggingService) { }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    if (ingName !== '') {
      if (ingAmount === '')
      {
        const newIngredient = new Ingredient(ingName, 1);
        this.ingredientAdded.emit(newIngredient);
        this.loggingService.logItemAdded(ingName, 1);
      }
      else
      {
      const newIngredient = new Ingredient(ingName, ingAmount);
      this.ingredientAdded.emit(newIngredient);
      this.loggingService.logItemAdded(ingName, ingAmount);
      }
    }
    else { this.loggingService.logNoItemInputted(); }

  }
}
