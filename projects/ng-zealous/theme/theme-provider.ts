import { inject, provideEnvironmentInitializer } from '@angular/core';
import { ZThemeService } from './theme-service';

export const provideZTheme = () =>
  provideEnvironmentInitializer(() => inject(ZThemeService).init());
