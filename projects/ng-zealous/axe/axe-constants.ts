import { ZAxeImpactMap } from './axe-types';

export const Z_AXE_IMPACT_MAP_DEFAULT: ZAxeImpactMap = {
  critical: true,
  serious: true,
  moderate: true,
  minor: false, // By default, minor issues are not displayed.
};
