import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  ZButtonColor,
  ZButtonIconSize,
  ZButtonJustifyContent,
  ZButtonModule,
  ZButtonTextAlign,
  ZButtonType,
} from 'ng-zealous/button';
import { ZClickModule } from 'ng-zealous/click';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, MatIconModule, RouterLink, ZButtonModule, ZClickModule, ZDemoModule],
  templateUrl: './button.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Button {
  protected demoState = {
    type: zDemoProp<ZButtonType | undefined>(['filled', 'tonal', 'outlined', undefined], {
      withHeading: 'Shape',
    }),
    color: zDemoProp<ZButtonColor>(['primary', 'secondary', 'error']),
    rounded: zDemoProp([false, true]),

    width: zDemoProp([undefined, '50%', '100%'], { withHeading: 'Sizing' }),
    height: zDemoProp([undefined, '150px']),

    icon: zDemoProp(['search', 'home', 'progress_activity', undefined], { withHeading: 'Content' }),
    iconSize: zDemoProp<ZButtonIconSize>(['md', 'lg', 'xl', '2xl']),
    text: zDemoProp(['single-line', 'multi-line', undefined] as const),
    separator: zDemoProp([false, true]),

    vertical: zDemoProp([false, true], { withHeading: 'Layout' }),
    verticalOnMobile: zDemoProp([false, true]),
    reverse: zDemoProp([false, true]),
    justifyContent: zDemoProp<ZButtonJustifyContent>(
      ['start', 'center', 'end', 'space-between', 'space-evenly'],
      {
        defaultValue: 'center',
      },
    ),
    textAlign: zDemoProp<ZButtonTextAlign>(['start', 'center', 'end'], { defaultValue: 'center' }),

    buttonDisabled: zDemoProp([false, true], { withHeading: 'Miscellaneous' }),
    customStyle: zDemoProp([false, true]),
  };

  protected clickHandler = () => undefined;
}
