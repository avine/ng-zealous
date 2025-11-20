// Resources:
// - https://material.angular.io/components/datepicker/overview#internationalization
// - https://www.devgem.io/posts/using-angular-material-datepicker-with-date-fns

import { ClassProvider, FactoryProvider, LOCALE_ID, ValueProvider } from '@angular/core';
import { DateFnsAdapter, MAT_DATE_FNS_FORMATS } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Locale } from 'date-fns/locale';
import { DateFnsConfig } from './date-fns-types';

export const provideDateFns = (
  configs: DateFnsConfig[],
): (FactoryProvider | ClassProvider | ValueProvider)[] => [
  {
    provide: MAT_DATE_LOCALE,
    useFactory: (localeId: string): Locale => {
      const locale = configs.find((config) => config.localeId === localeId)?.locale;
      if (!locale) {
        console.warn(`provideDateFns(): missing "DateFnsConfig" for localeId="${localeId}."`);
        return configs[0].locale;
      }
      return locale;
    },
    deps: [LOCALE_ID],
  },
  {
    provide: DateAdapter,
    useClass: DateFnsAdapter,
  },
  {
    provide: MAT_DATE_FORMATS,
    useValue: MAT_DATE_FNS_FORMATS,
  },
];
