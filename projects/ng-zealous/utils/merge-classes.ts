/**
 * Merges multiple CSS class names into a single space-separated string.
 * Filters out falsy values (false, null, undefined) to support conditional classes.
 *
 * @param classList - Variable number of class names or falsy values
 * @returns A space-separated string of valid class names
 *
 * @example
 * ```typescript
 * // Basic usage
 * mergeClasses('btn', 'btn-primary') // Returns: 'btn btn-primary'
 *
 * // Conditional classes
 * const isActive = true;
 * const disabled = false;
 * mergeClasses('btn', isActive && 'active', disabled && 'disabled') // Returns: 'btn active'
 *
 * // With null/undefined values
 * mergeClasses('card', null, 'shadow', undefined, false) // Returns: 'card shadow'
 * ```
 */
export const mergeClasses = (...classList: (string | false | null | undefined)[]) =>
  classList.filter((classItem) => !!classItem).join(' ');
