import { ZButton } from './button';
import { ZButtonGroup } from './button-group';
import { ZButtonIcon } from './button-icon';

export * from './button';
export * from './button-group';
export * from './button-icon';
export * from './button-types';

export const ZButtonModule = [ZButton, ZButtonGroup, ZButtonIcon] as const;
