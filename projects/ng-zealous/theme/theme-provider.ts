import { inject, provideAppInitializer } from '@angular/core';
import { ZThemeService } from './theme-service';

export const provideZTheme = () => provideAppInitializer(() => inject(ZThemeService).init());
