import { ZIconSize } from 'ng-zealous/icon';

/**
 * Visual style variants of the button.
 */
export type ZButtonType = 'filled' | 'tonal' | 'outlined';

/**
 * Color themes of the button.
 */
export type ZButtonColor = 'primary' | 'secondary' | 'error';

/**
 * Layouts of the button content (icon and text).
 */
export type ZButtonJustifyContent = 'center' | 'start' | 'end' | 'space-between' | 'space-evenly';

/**
 * Text alignments within the button.
 */
export type ZButtonTextAlign = 'center' | 'start' | 'end';

/**
 * Allowed icon sizes within the button.
 *
 * This is a subset of {@link ZIconSize}, restricting to medium and larger sizes that work well within button contexts.
 */
export type ZButtonIconSize = Extract<ZIconSize, 'md' | 'lg' | 'xl' | '2xl'>;
