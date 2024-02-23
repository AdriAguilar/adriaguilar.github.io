import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = true;
  presentTheme$ = new BehaviorSubject<string>('light');
  phrases: string[] = ["FRIEND", "DEVELOPER", "DESIGNER", "COFFEE DRINKER", "IT RECRUITER", "HR"];

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.presentTheme$.next(savedTheme);
    }
  }

  changeTheme(): void {
    this.presentTheme$.value === 'light'
      ? this.presentTheme$.next('dark')
      : this.presentTheme$.next('light');
    localStorage.setItem('theme', this.presentTheme$.value);
    this.isDarkMode = !this.isDarkMode;
  }
}
