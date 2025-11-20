import { Component, computed, ViewEncapsulation } from '@angular/core';
import { ZAlertModule, ZAlertType } from 'ng-zealous/alert';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';

type HeadingSize = 'none' | 'short' | 'medium' | 'long';

@Component({
  selector: 'app-alert',
  imports: [ZAlertModule, ZDemoModule],
  templateUrl: './alert.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Alert {
  protected demoState = {
    headingSize: zDemoProp(['none', 'short', 'medium', 'long'] satisfies HeadingSize[]),
    contentType: zDemoProp(['textNode', 'divElements', 'none'] as const),
    type: zDemoProp<ZAlertType>(['info', 'success', 'danger', 'light']),
    icon: zDemoProp([undefined, '', 'lightbulb', 'bolt']),
    nonClosable: zDemoProp([false, true]),
    visible: zDemoProp([true, false]),
  };

  protected heading = computed(() => {
    const headingParts = [
      'At vero eos et accusamus',
      'et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
      'deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    ];

    const indexMap: Record<HeadingSize, number> = { none: 0, short: 1, medium: 2, long: 3 };
    const endIndex = indexMap[this.demoState.headingSize()];

    return headingParts.slice(0, endIndex).join(' ');
  });
}
