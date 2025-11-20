import { DOCUMENT, Injectable, RendererFactory2, effect, inject, signal } from '@angular/core';
import { ZCookieService } from 'ng-zealous/cookie';
import { Z_THEME_COOKIE_KEY, Z_THEME_DARK_CLASS_NAME } from './theme-constants';
import { ZTheme } from './theme-types';

@Injectable({
  providedIn: 'root',
})
export class ZThemeService {
  private renderer = inject(RendererFactory2).createRenderer(null, null);

  private document = inject(DOCUMENT);

  private cookieService = inject(ZCookieService);

  private _theme = signal<ZTheme>(this.getCookie() ?? this.getDefault());

  theme = this._theme.asReadonly();

  private initialized = false;

  init() {
    if (this.initialized) {
      console.warn('ZThemeService: has already been initialized.');
      return;
    }
    this.initialized = true;

    effect(() => {
      const theme = this._theme();
      this.applyTheme(theme);
      this.setCookie(theme);
    });
  }

  switch(theme?: ZTheme) {
    this._theme.update((_theme) => ((theme ?? _theme === 'light') ? 'dark' : 'light'));
  }

  private applyTheme(theme: ZTheme) {
    this.renderer[theme === 'light' ? 'removeClass' : 'addClass'](
      this.document.body,
      Z_THEME_DARK_CLASS_NAME,
    );
  }

  private getCookie() {
    return this.cookieService.get<ZTheme>(Z_THEME_COOKIE_KEY) ?? undefined;
  }

  private setCookie(theme: ZTheme) {
    this.cookieService.set(Z_THEME_COOKIE_KEY, theme);
  }

  private getDefault(): ZTheme {
    return this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
