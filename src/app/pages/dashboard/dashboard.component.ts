import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  users: number = 0;
  actives: number = 0;
  inactives: number = 0;
  revoked: number = 0;

  constructor(private api: RestapiService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getData(){
    this.subscription = this.api.countUsers().subscribe(
      (res: any) => {
        this.users = res.all_users;
        this.actives = res.active_users;
        this.inactives = res.inactive_users;
        this.revoked = res.revoked_users;
      }
    );
  }
}
