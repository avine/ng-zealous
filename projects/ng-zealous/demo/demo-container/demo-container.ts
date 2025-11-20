import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, model, signal, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ZIconModule } from 'ng-zealous/icon';
import { ZMarkdownModule } from 'ng-zealous/markdown';
import { ZDemoStateForm } from '../demo-state/demo-state-form';
import { ZDemoState } from '../demo-state/demo-state-types';
import { ZDemoTitle } from '../demo-title/demo-title';
import { _removeHeadingLevel1 } from './_demo-container-utils';

@Component({
  selector: 'z-demo-container',
  host: { class: 'z-demo-container' },
  imports: [
    NgTemplateOutlet,
    MatIconModule,
    MatTabsModule,
    ZIconModule,
    ZMarkdownModule,
    ZDemoStateForm,
    ZDemoTitle,
  ],
  templateUrl: './demo-container.html',
  styleUrl: './demo-container.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZDemoContainer {
  state = model<ZDemoState<unknown>>({});

  docMarkdown = input<string>();

  // Remove the title (`h1`) from the `doc` after this title is already displayed by `<app-demo-title />`)
  protected docMarkdownWithoutHeading = computed(() =>
    _removeHeadingLevel1(this.docMarkdown() ?? ''),
  );

  protected selectedTabIndex = signal(0);
}
