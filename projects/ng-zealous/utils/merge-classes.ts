export const mergeClasses = (...classList: (string | false | null | undefined)[]) =>
  classList.filter((classItem) => !!classItem).join(' ');
