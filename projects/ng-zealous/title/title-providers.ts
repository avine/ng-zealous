import { ClassProvider, InjectionToken, ValueProvider } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ZTitleStrategy } from './title-strategy';

export const Z_TITLE_SUFFIX = new InjectionToken<string>('ZTitleSuffix');

export const provideZTitleSuffix = (suffix: string): ValueProvider => ({
  provide: Z_TITLE_SUFFIX,
  useValue: suffix,
});

export const provideZTitleStrategy = (): ClassProvider => ({
  provide: TitleStrategy,
  useClass: ZTitleStrategy,
});

export const provideZTitle = (suffix: string) => [
  provideZTitleSuffix(suffix),
  provideZTitleStrategy(),
];
