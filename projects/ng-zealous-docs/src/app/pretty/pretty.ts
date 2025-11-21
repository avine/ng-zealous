import { Component, ViewEncapsulation } from '@angular/core';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';

@Component({
  selector: 'app-pretty',
  imports: [ZDemoModule],
  templateUrl: './pretty.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Pretty {
  demoState = {
    pretty: zDemoProp([true, false]),
  };
}
