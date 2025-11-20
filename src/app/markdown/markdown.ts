import { Component, ViewEncapsulation } from '@angular/core';
import { ZDemoModule, zDemoProp } from 'ng-zealous/demo';
import { ZMarkdownModule } from 'ng-zealous/markdown';
import { MARKDOWN_CONTENT } from './markdown-constants';

@Component({
  selector: 'app-markdown',
  imports: [ZDemoModule, ZMarkdownModule],
  templateUrl: './markdown.html',
  encapsulation: ViewEncapsulation.None,
})
export default class Markdown {
  demoState = {
    use: zDemoProp<'Component' | 'Pipe'>(['Component', 'Pipe']),
  };

  content = MARKDOWN_CONTENT;
}
