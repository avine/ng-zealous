import { booleanAttribute, computed, Directive, input } from '@angular/core';

/**
 * Directive for grouping multiple `ZButton` components together with consistent spacing, alignment, and connected
 * borders.
 *
 * @example Horizontal button group (default)
 * ```html
 * <div zButtonGroup>
 *   <z-button>Option 1</z-button>
 *   <z-button>Option 2</z-button>
 *   <z-button>Option 3</z-button>
 * </div>
 * ```
 *
 * @example Vertical button group
 * ```html
 * <div zButtonGroup vertical>
 *   <z-button type="filled">Option 1</z-button>
 *   <button zButton="tonal">Option 2</button>
 *   <a zButton="outlined">Option 3</a>
 * </div>
 * ```
 */
@Directive({
  selector: '[zButtonGroup]',
  host: { '[class]': 'hostClass()' },
})
export class ZButtonGroup {
  /**
   * Arrange buttons vertically instead of horizontally.
   *
   * @default false
   *
   */
  vertical = input(false, { transform: booleanAttribute });

  protected hostClass = computed(() =>
    ['z-button-group', this.vertical() ? 'z-button-group--vertical' : 'z-button-group--horizontal'].join(' '),
  );
}
