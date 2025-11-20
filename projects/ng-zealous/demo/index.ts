export * from './demo-container/demo-container';

export * from './demo-lorem/demo-lorem';
export * from './demo-lorem/demo-lorem-utils';

export * from './demo-state/demo-state-form';
export * from './demo-state/demo-state-prop';
export * from './demo-state/demo-state-types';

export * from './demo-title/demo-title';

export * from './demo-constants';
export * from './demo-service';

import { ZDemoContainer } from './demo-container/demo-container';
import { ZDemoLorem } from './demo-lorem/demo-lorem';
import { ZDemoStateForm } from './demo-state/demo-state-form';
import { ZDemoTitle } from './demo-title/demo-title';

export const ZDemoModule = [ZDemoContainer, ZDemoLorem, ZDemoStateForm, ZDemoTitle];
