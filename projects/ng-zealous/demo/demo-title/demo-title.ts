import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ZIconModule } from 'ng-zealous/icon';

@Component({
  selector: 'z-demo-title',
  host: {
    class: 'z-demo-title z-sys-headline-large',
    '[attr.role]': '"heading"',
    '[attr.aria-level]': '"2"',
  },
  imports: [MatIconModule, ZIconModule],
  templateUrl: './demo-title.html',
  styleUrl: './demo-title.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZDemoTitle {
  private snapshot = inject(ActivatedRoute).snapshot;

  protected icon = this.snapshot.data['icon'];

  protected title = this.snapshot.title;
}
