import { inject, provideEnvironmentInitializer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ZIconFontSetClass } from './icon-types';

/**
 * Configures Material Symbols icons for the Material Icon module.
 *
 * This provider sets up the icon font set class to use Material Symbols instead
 * of the default Material Icons. It integrates with Angular Material's icon
 * registry to ensure icons are rendered with the correct font family.
 *
 * @param fontSetClass - The Material Symbols font set class to use.
 *
 * Possible values:
 * - `'material-symbols-outlined'`
 * - `'material-symbols-rounded'`
 * - `'material-symbols-sharp'`
 *
 * @returns An environment initializer provider that configures the icon
 * registry at application startup.
 *
 * @example
 * ```bash
 * # Step 1: Install the Material Symbols font package
 * npm install \@material-symbols/font-500 # or /font-400, ...
 * ```
 *
 * ```scss
 *
 * // Step 2: Import the font CSS in your styles (e.g., styles.scss)
 * \@use '@material-symbols/font-500/outlined.css'; // or /rounded.css, ...
 * ```
 *
 * ```typescript
 *
 * // Step 3: Configure the provider in your app.config.ts
 * import { provideZIcons } from '@ng-zealous/icon';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     // The fontSetClass must match the imported font CSS.
 *     provideZIcons('material-symbols-outlined'),
 *   ]
 * };
 * ```
 *
 * @see {@link https://fonts.google.com/icons | Material Symbols Icon Gallery}
 * @see {@link https://github.com/angular/components/issues/24845#issuecomment-1511399687 | Angular Material GitHub request}
 */
export const provideZIcons = (fontSetClass: ZIconFontSetClass) =>
  provideEnvironmentInitializer(() => {
    const matIconRegistry = inject(MatIconRegistry);

    const defaultFontSetClass = matIconRegistry.getDefaultFontSetClass();

    const customFontSetClass = defaultFontSetClass
      .filter((fontSetClass) => fontSetClass !== 'material-icons') // Remove default...
      .concat([fontSetClass]); // ...and add custom

    matIconRegistry.setDefaultFontSetClass(...customFontSetClass);
  });
