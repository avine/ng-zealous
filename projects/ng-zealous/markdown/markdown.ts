import {
  afterRenderEffect,
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { HLJSApi } from 'highlight.js';
import { clipboardIconHtml } from './markdown-constants';
import { ZMarkdownPipe } from './markdown-pipe';

declare global {
  interface Window {
    hljs?: HLJSApi;
  }
}

@Component({
  selector: 'z-markdown',
  host: {
    class: 'z-markdown z-sys-pretty',
    '[innerHTML]': 'html()',
  },
  template: '',
  styleUrl: './markdown.scss',
  providers: [ZMarkdownPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ZMarkdown {
  private markdownPipe = inject(ZMarkdownPipe);

  private domSanitizer = inject(DomSanitizer);

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  content = input.required<string>();

  protected html = computed(() => {
    const html = this.markdownPipe.transform(this.content());
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  });

  noCopyToClipboard = input(false, { transform: booleanAttribute });

  constructor() {
    afterRenderEffect(() => {
      this.html(); // effect dependency (do not remove)

      this.elementRef.nativeElement
        .querySelectorAll<HTMLElement>('pre code')
        .forEach((codeElement) => {
          if (window.hljs) {
            window.hljs.highlightElement(codeElement);
          }

          if (!this.noCopyToClipboard()) {
            this.addCopyToClipboard(codeElement.parentElement!, codeElement.innerText);
          }
        });
    });
  }

  private addCopyToClipboard(preElement: HTMLElement, text: string) {
    const button = document.createElement('button');

    button.ariaLabel = 'Copy to clipboard';
    button.className = 'z-markdown__copy-to-clipboard';
    button.innerHTML = clipboardIconHtml;

    button.addEventListener('click', () =>
      document.defaultView?.navigator.clipboard.writeText(text),
    );

    preElement.appendChild(button);
  }
}
