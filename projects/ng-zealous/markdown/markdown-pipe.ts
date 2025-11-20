import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'zMarkdown',
})
export class ZMarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return value ? marked.parse(value, { async: false }) : '';
  }
}
