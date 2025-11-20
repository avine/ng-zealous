import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { FactoryProvider } from '@angular/core';

/**
 * Provides the application base href by reading it from the DOM.
 *
 * This provider configures Angular's `APP_BASE_HREF` injection token by automatically detecting
 * the base href from the HTML document's `<base>` tag using the `PlatformLocation` service.
 *
 * @returns A factory provider that sets up the `APP_BASE_HREF` injection token
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * import { provideZBaseHref } from '@ng-zealous/base-href';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideZBaseHref(),
 *     // ... other providers
 *   ]
 * };
 * ```
 *
 * @example
 * ```html
 * <!-- In index.html -->
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <base href="/my-app/">
 *     <!-- The provider will automatically read "/my-app/" as the base href -->
 *   </head>
 * </html>
 * ```
 */
export const provideZBaseHref = (): FactoryProvider => ({
  provide: APP_BASE_HREF,
  useFactory: (platformLocation: PlatformLocation): string => platformLocation.getBaseHrefFromDOM(),
  deps: [PlatformLocation],
});
