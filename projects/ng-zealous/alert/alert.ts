import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ZIconModule } from 'ng-zealous/icon';
import { ZAlertIntl } from './alert-intl';
import { ZAlertType } from './alert-types';

/**
 * Alert component that displays messages with different styling based on their type.
 * Supports different visual styles, optional icons, headings, and can be dismissible.
 *
 * @example
 * ```html
 * <!-- Basic alert -->
 * <z-alert type="info">Information message</z-alert>
 *
 * <!-- Alert with heading -->
 * <z-alert type="success" heading="Operation successful">
 *   Your changes have been saved.
 * </z-alert>
 *
 * <!-- Alert with custom icon -->
 * <z-alert type="light" icon="notifications">
 *   You have new notifications.
 * </z-alert>
 *
 * <!-- Dismissible alert with two-way binding -->
 * <z-alert type="danger" heading="Error" [(visible)]="showAlert">
 *   Something went wrong. Please try again.
 * </z-alert>
 * ```
 */
@Component({
  selector: 'z-alert',
  host: { '[class]': 'hostClass()' },
  imports: [MatRippleModule, MatIconModule, ZIconModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZAlert {
  /**
   * Service for internationalization
   */
  protected intl = inject(ZAlertIntl);

  /**
   * The visual style of the alert.
   *
   * Possible values: `info`, `success`, `danger`, and `light`.
   * @default 'light'
   * @see ZAlertType
   */
  type = input<ZAlertType>('light');

  /**
   * Custom icon to display in the alert.
   * If not provided, a default icon based on the alert type will be used.
   */
  icon = input<string>();

  /**
   * Optional heading text to display at the top of the alert.
   */
  heading = input<string>();

  /**
   * Whether the alert can be closed by the user.
   * @default false
   */
  nonClosable = input(false, { transform: booleanAttribute });

  /**
   * Controls the visibility state of the alert.
   * Can be two-way bound with `[(visible)]`.
   * @default true
   */
  visible = model(true);

  /**
   * Computed classes for the host element based on type and visibility.
   */
  protected hostClass = computed(() =>
    ['z-alert', `z-alert--${this.type()}`]
      .concat(!this.visible() ? 'z-alert--hidden' : [])
      .join(' '),
  );

  /**
   * Maps alert types to their corresponding icon names.
   * Note: The 'light' type has no default icon.
   */
  protected iconMap: Record<ZAlertType, string> = {
    info: 'info',
    success: 'check_circle',
    danger: 'warning',
    light: '',
  };
}
