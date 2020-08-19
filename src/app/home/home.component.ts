import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {interval, observable, Observable, Subscription} from 'rxjs';
import {count, map, timeout, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    // this.firstObsSubscription = interval(1000)
    //   .subscribe((count) => {
    //     console.log(count);
    //   });
    const customIntervalObservable = Observable.create(observable => {
      let count = 0;
      setInterval(() => {
        observable.next(count);
        if (count === 2) {
          observable.complete();
        }
        if (count > 3) {
          observable.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });
    customIntervalObservable.pipe(filter(data => {
      return data > 1;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    }), ).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
  onLoadServers(): void {
    this.router.navigate(['/servers']);
  }
  onLoadServer(id: number): void {
    this.router.navigate(['/servers', id, 'edit'],
      {queryParams: {allowEdit: '1'},
        fragment: 'loading'});
  }
  onLogin(): void {
    this.authService.login();
  }
  onLogout(): void {
    this.authService.logout();
  }

}
