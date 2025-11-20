import { NavigationExtras } from '@angular/router';

export interface ZClickNavigationParams {
  commands: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  extras?: NavigationExtras;
}

export type ZClickRole = 'link' | 'button';
