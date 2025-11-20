import { afterNextRender, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ZThemeIntl } from '../theme-intl';
import { ZThemeService } from '../theme-service';

@Component({
  selector: 'z-theme-switcher',
  host: {
    class: 'z-theme-switcher',
    '[class.z-theme-switcher--visible]': 'visible()',
  },
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZThemeSwitcher {
  protected intl = inject(ZThemeIntl);

  protected themeService = inject(ZThemeService);

  protected visible = signal(false);

  constructor() {
    afterNextRender(() => this.visible.set(true));
  }
}
