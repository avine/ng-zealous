// Remove the `<h1>` heading (ex. `# Page heading`) at the beginning of a markdown document
export const _removeHeadingLevel1 = (markdown: string) => markdown.replace(/^\s*#[^\n]+\n/, '');
