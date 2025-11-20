import { Directive } from '@angular/core';

/**
 * Directive to apply proper spacing and styling to sections within an alert.
 * Use this directive when you need to organize alert content into multiple distinct sections,
 * particularly when using block-level elements like divs.
 *
 * This directive adds the `z-alert__section` CSS class which provides consistent vertical spacing
 * between sections inside the alert.
 *
 * @example
 * ```html
 * <z-alert type="info">
 *   <div zAlertSection>
 *     First section with important information.
 *   </div>
 *   <div zAlertSection>
 *     Second section with additional details.
 *   </div>
 * </z-alert>
 * ```
 */
@Directive({
  selector: '[zAlertSection]',
  host: { class: 'z-alert__section' },
})
export class ZAlertSection {}

/**
 * Directive to style links within an alert component.
 * Use this directive on anchor tags to ensure they have proper styling that matches
 * the alert's visual design and maintains good accessibility.
 *
 * This directive adds the `z-alert__link` CSS class which provides appropriate link styling
 * (color, underline, hover states) that works well with the alert's background and type.
 *
 * @example
 * ```html
 * <z-alert type="info">
 *   Please review our <a href="/terms" zAlertLink>terms of service</a> for more details.
 * </z-alert>
 * ```
 *
 * @example
 * ```html
 * <z-alert type="danger">
 *   <div zAlertSection>
 *     An error occurred. <a href="/help" zAlertLink>Get help</a> or try again.
 *   </div>
 * </z-alert>
 * ```
 */
@Directive({
  selector: '[zAlertLink]',
  host: { class: 'z-alert__link' },
})
export class ZAlertLink {}
