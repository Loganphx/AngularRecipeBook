import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  accounts = [
    {
      name: 'admin',
      password: 'password'
    },
  ];

  constructor() { }

  addAccount(name: string, password: string) {
    this.accounts.push({name: name, password: password});
  }
}
