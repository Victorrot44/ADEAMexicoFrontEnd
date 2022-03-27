import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html'
})
export class SignOutComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  seconds:number = 10;
  source = interval(1000);

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    localStorage.clear();
    this.subscription = this.source.subscribe(t => {
      this.seconds = this.seconds - 1;
      if (this.seconds == 0) {
        this.router.navigate(['/']);
      }
    });
  }

}
