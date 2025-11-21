import { inject, provideAppInitializer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ZIconFontSetClass } from './icon-types';

export const provideZIcons = (fontSetClass: ZIconFontSetClass) =>
  provideAppInitializer(() => {
    // Set font class according to the NPM package installed: "@material-symbols/font-*"
    // Values: 'material-symbols-outlined', 'material-symbols-rounded' or 'material-symbols-sharp'.
    //
    // See: https://fonts.google.com/icons
    // See: https://github.com/angular/components/issues/24845#issuecomment-1511399687

    const matIconRegistry = inject(MatIconRegistry);

    const defaultFontSetClass = matIconRegistry.getDefaultFontSetClass();

    const customFontSetClass = defaultFontSetClass
      .filter((fontSetClass) => fontSetClass !== 'material-icons') // Remove default...
      .concat([fontSetClass]); // ...and add custom

    matIconRegistry.setDefaultFontSetClass(...customFontSetClass);
  });
