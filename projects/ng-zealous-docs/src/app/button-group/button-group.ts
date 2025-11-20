import { Component, computed, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ZButtonColor,
  ZButtonJustifyContent,
  ZButtonModule,
  ZButtonTextAlign,
  ZButtonType,
} from 'ng-zealous/button';
import { ZClickModule } from 'ng-zealous/click';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';

@Component({
  selector: 'app-button-group',
  imports: [MatIconModule, ZButtonModule, ZClickModule, ZDemoModule],
  templateUrl: './button-group.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Button {
  protected demoState = {
    // Common group config
    count: zDemoProp([1, 2, 3], { defaultValue: 2, withHeading: 'Common group config' }),
    groupVertical: zDemoProp([false, true]),
    groupWidth: zDemoProp([undefined, '75%', '100%']),
    groupHeight: zDemoProp([undefined, '200px', '300px']),

    // Common button config
    rounded: zDemoProp([false, true], { withHeading: 'Common button config' }),
    separator: zDemoProp([false, true]),
    vertical: zDemoProp([false, true]),
    verticalOnMobile: zDemoProp([false, true]),
    reverse: zDemoProp([false, true]),
    justifyContent: zDemoProp<ZButtonJustifyContent>(
      ['start', 'center', 'end', 'space-between', 'space-evenly'],
      {
        defaultValue: 'center',
      },
    ),
    textAlign: zDemoProp<ZButtonTextAlign>(['start', 'center', 'end'], { defaultValue: 'center' }),
    buttonDisabled: zDemoProp([false, true]),

    // Left button (first one)
    type1: zDemoProp<ZButtonType | undefined>(['filled', 'tonal', 'outlined', undefined], {
      withHeading: 'Left button',
    }),
    color1: zDemoProp<ZButtonColor>(['primary', 'secondary', 'error']),
    icon1: zDemoProp(['search', 'home', 'progress_activity', undefined]),
    text1: zDemoProp(['single-line', 'multi-line', undefined] as const),

    // Right buttons (second and third one)
    type2: zDemoProp<ZButtonType | undefined>(['filled', 'tonal', 'outlined', undefined], {
      withHeading: 'Right button(s)',
    }),
    color2: zDemoProp<ZButtonColor>(['primary', 'secondary', 'error']),
    icon2: zDemoProp(['search', 'home', 'progress_activity', undefined]),
    text2: zDemoProp(['single-line', 'multi-line', undefined] as const),
  };

  protected rightButtons = computed(() => Array(this.demoState.count() - 1).fill('whatever'));

  protected clickHandler = () => undefined;
}
