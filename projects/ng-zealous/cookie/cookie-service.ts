import { isPlatformServer } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZCookieService {
  private isServer = isPlatformServer(inject(PLATFORM_ID));

  private document = inject(DOCUMENT);

  private request = inject(REQUEST);

  set(key: string, value: string): Promise<void>;
  set(options: CookieInit): Promise<void>;
  set(keyOrOptions: CookieInit | string, value?: string) {
    if (this.isServer) {
      return Promise.resolve();
    }

    if (typeof keyOrOptions === 'string') {
      return this.document.defaultView!.cookieStore.set(keyOrOptions, value ?? '');
    } else {
      return this.document.defaultView!.cookieStore.set(keyOrOptions);
    }
  }

  get<T extends string>(key: string) {
    return this.cookie.match(new RegExp(`${key}=([^;]+)`))?.[1] as T | undefined;
  }

  private get cookie() {
    // Note that `this.request` will be `null` when performing Static Site Generation (SSG).
    return (this.isServer ? this.request?.headers.get('cookie') : this.document.cookie) ?? '';
  }
}
