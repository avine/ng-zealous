import { inject, Injectable } from '@angular/core';
import { ZLocalStorage } from 'ng-zealous/storage';
import { Z_DEMO_FOCUS } from './demo-constants';

@Injectable({
  providedIn: 'root',
})
export class ZDemoService {
  /**
   * The "focus" mode indicates the need to hide certain elements of the page,
   * for example to take screenshots during e2e tests with Playwright.
   */
  readonly focus = inject(ZLocalStorage).getItem(Z_DEMO_FOCUS) === true;
}
