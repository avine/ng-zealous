import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ZThemeModule } from 'ng-zealous/theme';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, RouterLink, RouterOutlet, ZThemeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected routes = routes;
}
