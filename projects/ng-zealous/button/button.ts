import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { ZButtonIcon } from './button-icon';
import { ZButtonColor, ZButtonJustifyContent, ZButtonTextAlign, ZButtonType } from './button-types';

/**
 * A button component allowing the user to perform an action.
 *
 * @example Using custom element (the `ZClick` directive can be used to manage the action in an accessible way)
 * ```html
 * <z-button type="filled" [zClick]="clickMe()">Click me</z-button>
 * ```
 *
 * @example Using attribute selector on button
 * ```html
 * <button zButton="tonal" (click)="submit()">Submit</button>
 * ```
 *
 * @example Using attribute selector on anchor
 * ```html
 * <a zButton="outlined" color="secondary" routerLink="/profile">View Profile</a>
 * ```
 *
 * @example Adding icon
 * ```html
 * <z-button type="filled">
 *   <mat-icon zButtonIcon>add</mat-icon>
 *   Create New
 * </z-button>
 * ```
 * @see {@link ZButtonIcon} for icon styling within buttons
 *
 * @example Using CSS custom properties
 * ```html
 * <button
 *   zButton
 *   style="
 *     --z-button-background-color: var(--mat-sys-tertiary);
 *     --z-button-color: var(--mat-sys-on-tertiary);
 *   "
 * >
 *   Custom
 * </button>
 * ```
 */
@Component({
  selector: 'z-button, button[zButton], a[zButton]',
  host: {
    '[class]': 'hostClass()',
    '(keydown.enter)': 'launchRipple()',
    '(keyup.space)': 'launchRipple()',
  },
  hostDirectives: [MatRipple],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZButton {
  private matRipple = inject(MatRipple, { self: true });

  /**
   * Visual style of the button when using the component with the tag selector `<z-button>`.
   *
   * When undefined, the button has minimal styling with no background or border.
   *
   * @default undefined
   *
   * @see {@link ZButtonType} for available options.
   *
   * @example
   * ```html
   * <z-button type="filled">Filled button</z-button>
   * <z-button>Minimal button</z-button>
   * ```
   */
  type = input<ZButtonType>();

  /**
   * Visual style of the button when using the component with the attribute selector on `<button>` or `<a>` elements.
   *
   * When undefined or empty string, the button has minimal styling with no background or border.
   *
   * @default undefined
   *
   * @see {@link ZButtonType} for available options.
   *
   * @example Using button element
   * ```html
   * <button zButton="filled">Filled button</button>
   * <button zButton>Minimal button</button>
   * ```
   *
   * @example Using anchor element
   * ```html
   * <a zButton="tonal" routerLink="/home">Home</a>
   * <a zButton href="/profile">Profile</a>
   * ```
   */
  typeAlias = input(undefined, {
    alias: 'zButton',
    transform: (type: ZButtonType | undefined | ''): ZButtonType | undefined =>
      type === '' ? undefined : type,
  });

  /**
   * Color theme of the button.
   *
   * This input only applies visual changes when a `type` or `typeAlias` is specified.
   *
   * @default 'primary'
   *
   * @example
   * ```html
   * <button zButton="filled" color="primary">Save</button>
   * <button zButton="filled" color="secondary">Edit</button>
   * <button zButton="filled" color="error">Delete</button>
   * ```
   */
  color = input<ZButtonColor>('primary');

  /**
   * Increase the border radius of the button.
   *
   * When enabled, buttons containing text have a "more" rounded border.
   * Buttons containing only an icon (without text) become fully circular.
   *
   * @default false
   */
  rounded = input(false, { transform: booleanAttribute });

  /**
   * Display a vertical separator line between the icon and the text label.
   *
   * The separator is only visible when:
   * - The button contains both an icon and text
   * - The `vertical` input is `false` (horizontal layout)
   *
   * The separator color can be customized via the `--z-button-separator-color` CSS variable.
   *
   * @default false
   *
   * @example
   * ```html
   * <button zButton="filled" separator>
   *   <mat-icon zButtonIcon>download</mat-icon>
   *   Download File
   * </button>
   * ```
   */
  separator = input(false, { transform: booleanAttribute });

  /**
   * Arrange the button content (icon and text) vertically instead of horizontally.
   *
   * @default false
   *
   * @example
   * ```html
   * <button zButton="tonal" vertical>
   *   <mat-icon zButtonIcon>cloud_upload</mat-icon>
   *   Upload
   * </button>
   * ```
   */
  vertical = input(false, { transform: booleanAttribute });

  /**
   * On mobile, arrange the button content (icon and text) vertically instead of horizontally.
   *
   * The content (icon and text) is always centered on mobile devices (the `justifyContent` and `textAlign` inputs are
   * then ignored).
   *
   * @default false
   */
  verticalOnMobile = input(false, { transform: booleanAttribute });

  /**
   * Reverse the layout of the button content (icon and text).
   *
   * @default false
   */
  reverse = input(false, { transform: booleanAttribute });

  /**
   * Change the layout of the button content (icon and text).
   *
   * @default 'center'
   */
  justifyContent = input<ZButtonJustifyContent>('center');

  /**
   * Change the text alignment within the button.
   *
   * @default 'center'
   */
  textAlign = input<ZButtonTextAlign>('center');

  protected icon = contentChild(ZButtonIcon);

  // Computed button type, prioritizing `type` input over `typeAlias`.
  private computedType = computed(() => this.type() ?? this.typeAlias());

  protected hostClass = computed(() => {
    const type = this.computedType();
    return ['z-sys-reset', 'z-button', `z-button--${this.color()}`]
      .concat(type ? [`z-button--${type}`] : [], this.rounded() ? [`z-button--rounded`] : [])
      .join(' ');
  });

  // This method is called on keyboard interactions (Enter and Space keys).
  protected launchRipple() {
    this.matRipple.fadeOutAll(); // Remove previous ripple
    this.matRipple.launch({ centered: true });
  }
}
