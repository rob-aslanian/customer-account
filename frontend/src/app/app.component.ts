import { Component } from '@angular/core';
import { fadeInAnimation } from './core/animations/fade-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})
export class AppComponent {
  title = 'customer-account';
}
