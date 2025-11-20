import { Component, effect, inject, model, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ZAxeImpactMap } from '../axe-types';

@Component({
  selector: 'z-axe-impact-selector',
  host: { class: 'z-axe-impact-selector' },
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './axe-impact-selector.html',
  styleUrl: './axe-impact-selector.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ZAxeImpactSelector {
  readonly impacts = model.required<ZAxeImpactMap>();

  protected readonly form = inject(NonNullableFormBuilder).group({
    critical: [true],
    serious: [true],
    moderate: [true],
    minor: [true],
  });

  constructor() {
    // Keep `form.value` in sync with `impacts` model (but prevent infinite loop).
    effect(() => {
      const updateFormNeeded = Object.entries(this.impacts()).filter(([impact, checked]) => {
        return this.form.value[impact as keyof ZAxeImpactMap] !== checked;
      }).length;

      if (updateFormNeeded) {
        this.form.setValue(this.impacts());
      }
    });

    // Keep `impacts` model in sync with `form.value`.
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.impacts.set(this.form.value as Required<typeof this.form.value>);
    });
  }
}
