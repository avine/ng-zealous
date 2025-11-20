import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import type Axe from 'axe-core';
import { _sortAxeResultsByImpact } from './_axe-utils';

declare global {
  interface Window {
    axe?: typeof Axe;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ZAxeRunner {
  private readonly axe = inject(DOCUMENT).defaultView?.axe;

  private readonly _results = signal<Axe.AxeResults | undefined>(undefined);

  readonly results = this._results.asReadonly();

  readonly violations = computed(() => _sortAxeResultsByImpact(this._results()?.violations ?? []));

  get isAvailable() {
    return !!this.axe;
  }

  run() {
    this.axe?.run().then((results) => this._results.set(results));
  }
}
