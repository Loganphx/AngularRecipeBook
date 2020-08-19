import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServersService} from './servers/servers.service';
import {UserService} from "./users/user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServersService]
})
export class AppComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  title = 'RecipeBook';
  userActivated = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
