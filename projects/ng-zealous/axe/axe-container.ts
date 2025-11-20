import { Component } from '@angular/core';
import { ZAxeViolations } from './axe-violations/axe-violations';

// A tiny wrapper (`ZAxeContainer`) designed to load the actual feature (`ZAxeViolations`)
// in a separate chunk, using `@defer` block.

@Component({
  selector: 'z-axe-container',
  imports: [ZAxeViolations],
  template: `
    @defer {
      <z-axe-violations />
    }
  `,
})
export class ZAxeContainer {}
