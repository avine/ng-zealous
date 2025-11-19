import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { Z_ICON_MAX_ITERATIONS } from './icon-constants';
import { ZIconAnimation, ZIconPull, ZIconSize } from './icon-types';
import { mapToZIconClass, mapToZIconMaxIterations } from './icon-utils';

/**
 * Enhancing the Material icon component (`mat-icon`)
 *
 * The directive requires CSS styles to work properly that are defined and imported globally in:
 *   `ng-zealous/styles/modules/_icon.scss`
 *
 * @example
 * ```html
 * <mat-icon zIcon size="xl" pull="left" animation="beat">home</mat-icon>
 * ```
 */
@Directive({
  selector: '[zIcon]',
  host: {
    '[class]': 'hostClass()',
    '[style.font-variation-settings]': 'computedFill()',
    '[style.--z-icon-fill-duration]': 'fillDuration()',
    '[style.--z-icon-animation-duration]': 'animationDuration()',
    '(animationiteration)': 'currentIteration.set($event.elapsedTime)',
  },
})
export class ZIcon {
  pull = input('', { transform: mapToZIconClass<ZIconPull> });

  size = input('', { transform: mapToZIconClass<ZIconSize> });

  fill = input(false, { transform: booleanAttribute });

  fillDuration = input<string>();

  animation = input('', { transform: mapToZIconClass<ZIconAnimation> });

  animationDuration = input<string>();

  maxIterations = input(Z_ICON_MAX_ITERATIONS, { transform: mapToZIconMaxIterations });

  protected currentIteration = signal(0);

  protected computedFill = computed(() => `"FILL" ${this.fill() ? 1 : 0}`);

  protected computedAnimation = computed(() => {
    const animation = this.animation();
    if (!animation) {
      return '';
    }

    const maxIterations = this.maxIterations();
    if (maxIterations === false) {
      return animation;
    }

    return this.currentIteration() < maxIterations ? this.animation() : '';
  });

  protected hostClass = computed(() =>
    ['z-icon', this.size(), this.pull(), this.computedAnimation()]
      .filter((value) => value)
      .join(' '),
  );

  constructor() {
    effect(() => {
      // Run effect when `maxIterations` changes.
      const maxIterations = this.maxIterations();
      if (maxIterations === false) {
        return;
      }

      // Run effect when `animation` changes (and `maxIterations` is NOT `false`).
      this.animation();

      if (untracked(() => this.currentIteration() >= maxIterations)) {
        this.currentIteration.set(0);
      }
    });
  }
}
