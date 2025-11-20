import {
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import type Axe from 'axe-core';
import { ZDemoService } from 'ng-zealous/demo';
import { ZIconModule } from 'ng-zealous/icon';
import { Z_AXE_IMPACT_MAP_DEFAULT } from '../axe-constants';
import { ZAxeImpactSelector } from '../axe-impact-selector/axe-impact-selector';
import { ZAxeRunner } from '../axe-runner';
import { ZAxeImpactMap } from '../axe-types';

@Component({
  selector: 'z-axe-violations',
  host: {
    class: 'z-axe-violations',
    '[class.z-axe-violations--hidden]': 'hidden',
    role: 'region',
  },
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ZIconModule,
    ZAxeImpactSelector,
  ],
  templateUrl: './axe-violations.html',
  styleUrl: './axe-violations.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZAxeViolations {
  protected axeRunner = inject(ZAxeRunner);

  protected document = inject(DOCUMENT);

  protected hidden = inject(ZDemoService).focus;

  protected visible = signal(false);

  protected highlighted = signal<{ result: Axe.Result; selectors: string } | undefined>(undefined);

  protected impacts = signal<ZAxeImpactMap>(this.restoreImpacts());

  protected selectedViolations = computed(() => {
    const impacts = this.impacts();
    return this.axeRunner.violations().filter(({ impact }) => !impact || impacts[impact]);
  });

  constructor() {
    effect(() => {
      this.selectedViolations(); // Effect dependency

      const selectors = untracked(() => this.highlighted()?.selectors);
      if (selectors) {
        this.highlight('remove', selectors);
        this.highlighted.set(undefined);
      }
    });

    effect(() => this.storeImpacts(this.impacts()));

    inject(DestroyRef).onDestroy(() => this.toggleHighlighted());
  }

  protected togggleVisible() {
    this.visible.update((visible) => !visible);
  }

  protected toggleHighlighted(violation?: Axe.Result) {
    const currentHighlighted = this.highlighted();
    if (currentHighlighted) {
      this.highlight('remove', currentHighlighted.selectors);
      this.highlighted.set(undefined);
    }

    if (!violation || violation === currentHighlighted?.result) {
      return;
    }

    const nextSelectors = violation.nodes.map(({ target }) => target.join(', ')).join(', ');
    this.highlight('add', nextSelectors);
    this.highlighted.set({ result: violation, selectors: nextSelectors });
  }

  private highlight(action: 'add' | 'remove', selectors: string) {
    this.document
      .querySelectorAll(selectors)
      .forEach((element) => element.classList[action]('z-axe-violations-highlight'));
  }

  private restoreImpacts(): ZAxeImpactMap {
    const impacts = Z_AXE_IMPACT_MAP_DEFAULT;
    try {
      return {
        ...impacts,
        ...JSON.parse(
          this.document.defaultView?.localStorage?.getItem('z-axe-violations-impacts') ?? '',
        ),
      };
    } catch {
      return impacts;
    }
  }

  private storeImpacts(impacts: ZAxeImpactMap) {
    this.document.defaultView?.localStorage?.setItem(
      'z-axe-violations-impacts',
      JSON.stringify(impacts),
    );
  }
}
