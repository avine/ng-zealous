import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, Signal, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { ZBreakpointMap, ZBreakpointName } from './breakpoint-types';

@Injectable({
  providedIn: 'root',
})
export class ZBreakpointObserver {
  private breakpointMap$ = inject(BreakpointObserver)
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(
      takeUntilDestroyed(),
      map(({ breakpoints }): ZBreakpointMap => {
        return {
          XSmall: breakpoints[Breakpoints.XSmall],
          Small: breakpoints[Breakpoints.Small],
          Medium: breakpoints[Breakpoints.Medium],
          Large: breakpoints[Breakpoints.Large],
          XLarge: breakpoints[Breakpoints.XLarge],
        };
      }),
      shareReplay(1),
    );

  breakpointMap = toSignal(this.breakpointMap$);

  breakpoint = computed<ZBreakpointName | undefined>(() => {
    const breakpointMap = this.breakpointMap();
    if (breakpointMap?.XSmall) {
      return 'XSmall';
    }
    if (breakpointMap?.Small) {
      return 'Small';
    }
    if (breakpointMap?.Medium) {
      return 'Medium';
    }
    if (breakpointMap?.Large) {
      return 'Large';
    }
    if (breakpointMap?.XLarge) {
      return 'XLarge';
    }
    return undefined;
  });

  matches(breakpoints: ZBreakpointName[]): Signal<boolean>;
  matches<T>(breakpoints: ZBreakpointName[], fn: (matches: boolean) => T): Signal<T>;
  matches<T>(breakpoints: ZBreakpointName[], fn?: (matches: boolean) => T) {
    return computed(() => {
      const breakpoint = this.breakpoint();
      const matches = breakpoint ? breakpoints.includes(breakpoint) : false;
      return fn ? fn(matches) : matches;
    });
  }
}
