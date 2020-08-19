import {Component, EventEmitter, Input, OnInit} from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, CanDeactivate, Params, Router} from '@angular/router';
import {CanComponentDeactivate, CanDeactivateGuard} from './can-deactivate-guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams.allowEdit === '1' ? true : false;
          console.log(this.allowEdit);
          console.log(queryParams.allowEdit);
        }
      );
    this.activeRoute.fragment.subscribe();
    const id = +this.activeRoute.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.activeRoute.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params.id);
      });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer(): void {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    } else {
      if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ) {
        return confirm('Do you want to discard changes?');
      } else {
        return true;
      }
    }
  }

}
