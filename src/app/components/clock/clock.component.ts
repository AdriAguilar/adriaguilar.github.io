import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map, share, timer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html'
})
export class ClockComponent implements OnInit, OnDestroy {
  rxTime: Date = new Date();
  sub: Subscription;

  ngOnInit(): void {
    this.sub = timer(0, 1000)
      .pipe(
        map( _ => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy(): void {
    if (this.sub)
    {
      this.sub.unsubscribe();
    }
  }
}
