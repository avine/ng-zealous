import { JsonPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ZBreakpointObserver } from 'ng-zealous/breakpoint';
import { ZDemoModule } from 'ng-zealous/demo';

@Component({
  selector: 'app-breakpoint',
  imports: [JsonPipe, ZDemoModule],
  templateUrl: './breakpoint.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Breakpoint {
  breakpoint = inject(ZBreakpointObserver).breakpoint;

  breakpointMap = inject(ZBreakpointObserver).breakpointMap;

  isMobile = inject(ZBreakpointObserver).matches(['XSmall', 'Small']);
}
