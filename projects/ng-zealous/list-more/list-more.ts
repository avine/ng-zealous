import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChildren, input, model, numberAttribute, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ZListMoreItem } from './list-more-item';

@Component({
  selector: 'z-list-more',
  host: { class: 'z-list-more' },
  imports: [NgTemplateOutlet, MatIconModule],
  templateUrl: './list-more.html',
  styleUrl: './list-more.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZListMore {
  protected items = contentChildren(ZListMoreItem);

  moreHeading = input<string>();

  moreIndex = input(undefined, { transform: (value: number | string) => numberAttribute(value, undefined) });

  showMore = model(false);

  protected splitIndex = computed(() => {
    const { length } = this.items();
    return Math.min(this.moreIndex() ?? length, length);
  });

  protected toggleShowMore() {
    this.showMore.update((showMore) => !showMore);
  }
}
