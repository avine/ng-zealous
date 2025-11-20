export const _buildInitials = (name: string): string =>
  name
    .trim()
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .reduce((initials, word) => initials + word.charAt(0), '')
    .toUpperCase();
