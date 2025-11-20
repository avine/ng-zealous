import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';
import {
  ZIconAnimation,
  ZIconModule,
  ZIconPull,
  ZIconSize,
  Z_ICON_MAX_ITERATIONS,
} from 'ng-zealous/icon';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule, ZDemoModule, ZIconModule],
  templateUrl: './icon.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Icon {
  protected demoState = {
    pull: zDemoProp<ZIconPull>(['none', 'left', 'right']),

    size: zDemoProp<ZIconSize>(
      [
        'none',
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x',
        '2xs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
      ],
      { defaultValue: 'lg' },
    ),

    fill: zDemoProp([false, true]),

    fillDuration: zDemoProp([undefined, '500ms', '1s']),

    animation: zDemoProp<ZIconAnimation>(
      ['none', 'beat', 'bounce', 'fade', 'flip', 'shake', 'spin'],
      {},
    ),

    animationDuration: zDemoProp([undefined, '2s', '3s']),

    maxIterations: zDemoProp([15, Z_ICON_MAX_ITERATIONS, 5, false as const], {
      defaultValue: Z_ICON_MAX_ITERATIONS,
    }),

    icon: zDemoProp(['home', 'progress_activity', 'change_circle']),
  };
}
