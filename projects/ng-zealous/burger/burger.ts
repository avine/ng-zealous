import { Component, ViewEncapsulation, model } from '@angular/core';
import { MatRipple } from '@angular/material/core';

/**
 * A burger menu button component that toggles between active and inactive states.
 *
 * @example
 * ```html
 * <z-burger [(active)]="isMenuOpen" />
 * ```
 *
 * @description
 * The `ZBurger` component features:
 * - Material Design ripple effect
 * - Pointer device accessibility (Click event support)
 * - Keyboard accessibility (Enter key support)
 * - Two-way binding for active state
 */
@Component({
  selector: 'z-burger',
  host: {
    class: 'z-burger',
    '[class.z-burger--active]': 'active()',
    '[tabIndex]': '0',
    '(click)': 'toggle()',
    '(keyup.enter)': 'toggle()',
  },
  hostDirectives: [MatRipple],
  templateUrl: './burger.html',
  styleUrl: './burger.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZBurger {
  /**
   * Signal that controls the active state of the burger menu.
   * Can be bound to using two-way binding syntax: `[(active)]`.
   */
  active = model(false);

  /**
   * Toggles the active state of the burger menu.
   * Called when the user clicks the button or presses Enter while focused.
   */
  toggle() {
    this.active.update((active) => !active);
  }
}
