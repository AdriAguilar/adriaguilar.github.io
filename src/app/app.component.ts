import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  phrases: string[] = ["FRIEND", "DEVELOPER", "DESIGNER", "COFFEE DRINKER", "IT RECRUITER", "HR"];
}
