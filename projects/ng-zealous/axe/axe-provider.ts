import { inject, provideEnvironmentInitializer } from '@angular/core';
import { ZAxeService } from './axe-service';

export const provideZAxe = () => provideEnvironmentInitializer(() => inject(ZAxeService).start());
