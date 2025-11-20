import { computed, Directive, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { _isNavigationCommands, _isNavigationParams } from './_click-utils';
import { ZClickNavigationParams, ZClickRole } from './click-types';

@Directive({
  selector: '[zClick]:not(a):not(button)',
  host: {
    style: 'cursor: pointer',
    tabindex: '0',
    '[attr.role]': 'computedRole()',
    '(click)': 'handle()',
    '(keydown.enter)': 'handle()',
    '(keydown.space)': 'computedRole() === "button" && handle()',
  },
})
export class ZClick {
  private router = inject(Router);

  params = input.required<ZClickNavigationParams | ZClickNavigationParams['commands'] | CallableFunction>({
    alias: 'zClick',
  });

  role = input<ZClickRole>();

  protected defaultRole = computed<ZClickRole>(() => {
    const params = this.params();
    if (_isNavigationParams(params) || _isNavigationCommands(params)) {
      return 'link';
    } else {
      return 'button';
    }
  });

  protected computedRole = computed(() => this.role() ?? this.defaultRole());

  protected handle() {
    const params = this.params();
    if (_isNavigationParams(params)) {
      this.router.navigate(params.commands, params.extras);
    } else if (_isNavigationCommands(params)) {
      this.router.navigate(params);
    } else {
      params();
    }
  }
}
