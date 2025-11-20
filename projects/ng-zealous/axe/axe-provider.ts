import { inject, provideAppInitializer } from '@angular/core';
import { ZAxeService } from './axe-service';

export const provideZAxe = () => provideAppInitializer(() => inject(ZAxeService).start());
