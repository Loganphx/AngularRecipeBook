import {Component, Input, OnInit} from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  providers: [ServersService]
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];
  constructor(private serversService: ServersService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }
  onReload(): void {
    // this.router.navigate(['servers'], {relativeTo: this.activeRoute});
    this.router.navigate(['/servers']);
  }

}
