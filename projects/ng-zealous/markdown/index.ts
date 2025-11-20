import { ZMarkdown } from './markdown';
import { ZMarkdownPipe } from './markdown-pipe';

export * from './markdown';
export * from './markdown-pipe';

export const ZMarkdownModule = [ZMarkdown, ZMarkdownPipe] as const;
