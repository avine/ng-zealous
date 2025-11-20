import { DestroyRef, inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, Subscription } from 'rxjs';
import { ZAxeOverlay } from './axe-overlay';
import { ZAxeRunner } from './axe-runner';

@Injectable({
  providedIn: 'root',
})
export class ZAxeService {
  readonly runner = inject(ZAxeRunner);

  readonly overlay = inject(ZAxeOverlay);

  private readonly router = inject(Router);

  private subscription?: Subscription;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  start() {
    if (!this.runner.isAvailable || this.subscription) {
      return;
    }

    this.subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        delay(250), // Wait some time to be "more confident" that all page content has been rendered...
      )
      .subscribe(() => this.runner.run());

    this.overlay.attach();
  }

  stop() {
    this.subscription?.unsubscribe();
    this.overlay.dispose();
  }
}
