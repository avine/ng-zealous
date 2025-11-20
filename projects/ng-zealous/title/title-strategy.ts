import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Z_TITLE_SUFFIX } from './title-providers';

@Injectable({
  providedIn: 'root',
})
export class ZTitleStrategy extends TitleStrategy {
  private title = inject(Title);

  private suffix = inject(Z_TITLE_SUFFIX);

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (!title) {
      return;
    }
    this.title.setTitle(`${title} - ${this.suffix}`);
  }
}
