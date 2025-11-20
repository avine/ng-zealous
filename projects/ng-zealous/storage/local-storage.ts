import { DOCUMENT, inject, Injectable } from '@angular/core';
import { _ZStorage } from './_storage';

@Injectable({
  providedIn: 'root',
})
export class ZLocalStorage extends _ZStorage {
  protected storage = inject(DOCUMENT).defaultView?.localStorage;
}
