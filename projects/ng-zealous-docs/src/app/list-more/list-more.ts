import { Component, ViewEncapsulation } from '@angular/core';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';
import { ZListMoreModule } from 'ng-zealous/list-more';

@Component({
  selector: 'app-list-more',
  imports: [ZDemoModule, ZListMoreModule],
  templateUrl: './list-more.html',
  styleUrl: './list-more.scss',
  encapsulation: ViewEncapsulation.None,
})
export default class ListMore {
  protected demoState = {
    moreIndex: zDemoProp([0, 1, 2, 3, 4], { defaultValue: 2 }),

    margin: zDemoProp(['0rem', undefined, '1.5rem', '3rem'], { defaultValue: undefined }), // Fallback to `$box-group-gap` when `undefined` (see: `ng-zaelous/styles/config.scss`)

    toggleIndent: zDemoProp(['0rem', '0.75rem', undefined, '2.5rem'], { defaultValue: undefined }), // Fallback to `$box-padding-inline` when `undefined`
  };
}
