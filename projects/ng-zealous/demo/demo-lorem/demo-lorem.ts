import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';
import { Z_DEMO_LOREMS } from './demo-lorem-utils';

@Component({
  selector: 'z-demo-lorem',
  host: { class: 'z-demo-lorem z-sys-pretty' },
  templateUrl: './demo-lorem.html',
  styleUrl: './demo-lorem.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZDemoLorem {
  count = input(1, { transform: numberAttribute });

  noTag = input(false, { transform: booleanAttribute });

  protected lorems = computed(() =>
    Array<string>(this.count())
      .fill('')
      .map((_, index) => Z_DEMO_LOREMS[index % Z_DEMO_LOREMS.length]),
  );
}
