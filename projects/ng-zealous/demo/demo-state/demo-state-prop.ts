import { signal } from '@angular/core';
import { ZDemoProp, ZDemoPropConfig } from './demo-state-types';

export const zDemoProp = <T>(values: T[], config: ZDemoPropConfig<T> = {}): ZDemoProp<T> => {
  const defaultValue = 'defaultValue' in config ? config.defaultValue! : values[0];

  const prop = signal<T>(defaultValue) as ZDemoProp<T>;

  prop.next = () => {
    const nextIndex = (values.indexOf(prop()) + 1) % values.length;
    prop.set(values[nextIndex]);
  };

  prop.values = values;

  prop.config = config;

  return prop;
};
