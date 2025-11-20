// This declaration enables the import of markdown files into TypeScript files.
declare module '*.md' {
  const content: string;
  export default content;
}
