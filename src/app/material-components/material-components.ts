import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ZDemoModule } from 'ng-zealous/demo';

// Warning:
// Do NOT import the all `MatDatepickerModule` otherwise,
// it will overwrite the `MatDatepickerIntl` provided globally by `provideMatDatepickerIntl()`.

@Component({
  selector: 'app-material-components',
  imports: [
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTabsModule,
    ZDemoModule,
  ],
  templateUrl: './material-components.html',
  styleUrl: './material-components.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class MaterialComponents {
  formControl1 = new FormControl('', [Validators.required]);
  formControl2 = new FormControl('', [Validators.required]);

  constructor() {
    this.formControl2.markAsTouched();
  }
}
