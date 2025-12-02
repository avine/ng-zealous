import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[zListMoreItem]',
})
export class ZListMoreItem {
  templateRef = inject<TemplateRef<unknown>>(TemplateRef);
}
