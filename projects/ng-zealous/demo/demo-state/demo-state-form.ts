import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  afterNextRender,
  Component,
  computed,
  effect,
  inject,
  model,
  output,
  signal,
  TemplateRef,
  untracked,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ZDemoService } from '../demo-service';
import { _OfTypeBooleanPipe, _StateValuePipe } from './_demo-state-pipes';
import { _patchZDemoStateWithUnsafeCommand } from './_demo-state-utils';
import { ZDemoState } from './demo-state-types';

@Component({
  selector: 'z-demo-state-form',
  host: { class: 'z-demo-state-form' },
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    _OfTypeBooleanPipe,
    _StateValuePipe,
  ],
  templateUrl: './demo-state-form.html',
  styleUrls: ['./demo-state-form.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ZDemoStateForm<T> {
  private overlay = inject(Overlay);

  private viewContainerRef = inject(ViewContainerRef);

  private template = viewChild.required(TemplateRef);

  protected visible = signal(false);

  state = model.required<ZDemoState<T>>();

  propChange = output<keyof T>();

  protected props = computed(() => Object.keys(this.state()) as (keyof T)[]);

  /**
   * Retrieve command from URL query param.
   *
   * @example
   * ```txt
   * http://localhost:4200/avatar?demoState={"fontSize":"2.5rem"}
   * ```
   */
  private command = toSignal<string | undefined>(
    inject(ActivatedRoute).queryParams.pipe(map((queryParams) => queryParams['demoState'])),
  );

  protected hidden = inject(ZDemoService).focus;

  constructor() {
    afterNextRender(() => {
      if (!this.props().length) {
        return;
      }
      this.overlay.create().attach(new TemplatePortal(this.template(), this.viewContainerRef));
    });

    effect(() => {
      const command = this.command();
      if (!command) {
        return;
      }
      _patchZDemoStateWithUnsafeCommand(
        untracked(() => this.state()),
        command,
      );
    });
  }

  protected toggleVisible() {
    this.visible.update((visible) => !visible);
  }
}
