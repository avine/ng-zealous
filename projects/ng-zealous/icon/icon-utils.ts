import { numberAttribute } from '@angular/core';
import { Z_ICON_MAX_ITERATIONS } from './icon-constants';

export const mapToZIconClass = <T = string>(value: T) =>
  value !== 'none' ? `z-icon--${value}` : '';

export const mapToZIconMaxIterations = (
  value: number | false | string | null | undefined,
): number | false => {
  if (value === false || value === 'false' || value === null || value === undefined) {
    return false;
  }
  return numberAttribute(value, Z_ICON_MAX_ITERATIONS);
};
