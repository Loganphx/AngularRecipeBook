import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logItemAdded(item: string, amount: number) {
    console.log('A new item has been added, ' + item + ' (' + amount + ')');
  }
  logNoItemInputted() {
    console.log('No Item name was inputted please type an item name and try again.');
  }
  constructor() { }
}
