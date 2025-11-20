import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DOCUMENT,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ZDemoModule } from 'ng-zealous/demo';
import { ZThemeService } from 'ng-zealous/theme';
import { ElementToBgColorPipe } from './element-to-bg-color-pipe';
import { MaterialColorsMap } from './material-colors-types';

@Component({
  selector: 'app-material-colors',
  host: { class: 'app-material-colors' },
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ZDemoModule,
    ElementToBgColorPipe,
  ],
  templateUrl: './material-colors.html',
  styleUrl: './material-colors.scss',
  encapsulation: ViewEncapsulation.None,

  // This doc use `OnPush` strategy to demonstrate the necessity of
  // `this.theme();` usage in `materialColorsMapFiltered` computed signal.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaterialColors {
  private document = inject(DOCUMENT);

  private theme = inject(ZThemeService).theme;

  protected showCssVariable = false;

  protected displayHexColor = true;

  // Learn more about Material color roles:
  //    - https://material.angular.io/guide/system-variables
  //    - https://m3.material.io/styles/color/roles
  protected materialColorsMap: MaterialColorsMap[] = [
    {
      heading: 'Primary',
      roles: ['primary', 'on-primary', 'primary-container', 'on-primary-container'],
    },

    {
      heading: 'Secondary',
      roles: ['secondary', 'on-secondary', 'secondary-container', 'on-secondary-container'],
    },

    {
      heading: 'Tertiary',
      roles: ['tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container'],
    },

    {
      heading: 'Error',
      roles: ['error', 'on-error', 'error-container', 'on-error-container'],
    },

    {
      heading: 'Outline',
      roles: ['outline', 'outline-variant'],
    },

    {
      heading: 'Surface',
      roles: [
        // 'background', // Same as 'surface'
        // 'on-background', // Same as 'on-surface'

        'surface',
        'on-surface',

        'surface-variant',
        'on-surface-variant',

        'surface-container-lowest',
        'surface-container-low',
        'surface-container',
        'surface-container-high',
        'surface-container-highest',
        'surface-dim',
        'surface-bright',
        'surface-tint',
      ],
    },

    {
      heading: 'Primary fixed',
      roles: ['primary-fixed', 'primary-fixed-dim', 'on-primary-fixed', 'on-primary-fixed-variant'],
    },

    {
      heading: 'Secondary fixed',
      roles: [
        'secondary-fixed',
        'secondary-fixed-dim',
        'on-secondary-fixed',
        'on-secondary-fixed-variant',
      ],
    },

    {
      heading: 'Tertiary fixed',
      roles: [
        'tertiary-fixed',
        'tertiary-fixed-dim',
        'on-tertiary-fixed',
        'on-tertiary-fixed-variant',
      ],
    },

    {
      heading: 'Inverse',
      roles: ['inverse-primary', 'inverse-surface', 'inverse-on-surface'],
    },

    {
      heading: 'Miscellaneous',
      roles: [
        // 'scrim', // Same as shadow
        'shadow',
      ],
    },
  ];

  protected roleFilter = signal('');

  protected materialColorsMapFiltered = computed<MaterialColorsMap[]>(() => {
    // Reevaluate computed signal when theme changes
    // (to trigger the update of the color value displayed by `ElementToBgColorPipe` - which is a non-pure pipe)
    this.theme();

    const roleFilter = this.roleFilter();
    return this.materialColorsMap
      .map((colors) => ({
        heading: colors.heading,
        roles: colors.roles.filter((role) => role.includes(roleFilter)),
      }))
      .filter((colors) => colors.roles.length);
  });

  protected toClipboard(color: string) {
    this.document.defaultView?.navigator.clipboard.writeText(color);
  }
}
