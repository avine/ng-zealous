import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { enUS, fr } from 'date-fns/locale';
import { provideZAxe } from 'ng-zealous/axe';
import { provideZBaseHref } from 'ng-zealous/base-href';
import { provideDateFns } from 'ng-zealous/date-fns';
import { provideZIcons } from 'ng-zealous/icon';
import { provideZTheme } from 'ng-zealous/theme';
import { provideZTitle } from 'ng-zealous/title';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),

    provideDateFns([
      { localeId: 'en', locale: enUS },
      { localeId: 'fr', locale: fr },
    ]),

    provideZAxe(),
    provideZBaseHref(),
    provideZIcons('material-symbols-outlined'),
    provideZTheme(),
    provideZTitle('NgZealous Docs'),
  ],
};
