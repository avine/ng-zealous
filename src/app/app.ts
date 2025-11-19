import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ZIconModule } from 'ng-zealous/icon';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, RouterOutlet, ZIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
