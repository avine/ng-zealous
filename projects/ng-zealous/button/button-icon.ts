import { computed, Directive, input } from '@angular/core';
import { mapToZIconClass, ZIcon } from 'ng-zealous/icon';
import { ZButtonIconSize } from './button-types';

/**
 * Directive for displaying icons within button components with optimized sizing and styling.
 *
 * This directive extends the {@link ZIcon} directive with button-specific constraints and defaults. It should be
 * applied to `<mat-icon>` elements placed inside `ZButton` components.
 *
 * @example Using icon with text
 * ```html
 * <z-button type="filled">
 *   <mat-icon zButtonIcon>add</mat-icon>
 *   Create
 * </z-button>
 * ```
 *
 * @example Using icon only
 * ```html
 * <button zButton="filled" aria-label="Search">
 *   <mat-icon zButtonIcon>search</mat-icon>
 * </button>
 * ```
 *
 * @example Using icon inputs
 * ```html
 * <button zButton="tonal">
 *   <mat-icon zButtonIcon size="xl" fill animation="spin">progress_activity</mat-icon>
 *   Loading
 * </button>
 * ```
 *
 * @remarks
 * The `size` input has a default value of 'md', unlike the base {@link ZIcon} directive which has no default. This is
 * why `size` is not exposed in the `hostDirectives` configuration.
 *
 * @see {@link ZIcon} for the base icon directive
 * @see {@link ZButtonIconSize} for available size values
 *
 */
@Directive({
  selector: '[zButtonIcon]',
  hostDirectives: [
    {
      directive: ZIcon,
      inputs: ['fill', 'fillDuration', 'animation', 'maxIterations'],
    },
  ],
  host: {
    '[class]': 'sizeClass()',
  },
})
export class ZButtonIcon {
  /**
   * Size of the icon within the button.
   *
   * This input needs a default value, unlike the {@link ZIcon} directive for which the `size` input does not have one.
   * For this reason, this input has not been exposed in the `hostDirectives` inputs (alongside `'fill', 'fillDuration',
   * ...`).
   *
   * @default 'md'
   */
  size = input<ZButtonIconSize>('md');

  protected sizeClass = computed(() => mapToZIconClass(this.size()));
}
