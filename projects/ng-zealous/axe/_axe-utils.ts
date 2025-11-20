import type Axe from 'axe-core';

const AXE_IMPACT_VALUES: Axe.ImpactValue[] = [null, 'minor', 'moderate', 'serious', 'critical'];

export const _sortAxeResultsByImpact = (results: Axe.Result[]) => {
  return [...results].sort(
    (a, b) => AXE_IMPACT_VALUES.indexOf(b.impact ?? null) - AXE_IMPACT_VALUES.indexOf(a.impact ?? null),
  );
};
