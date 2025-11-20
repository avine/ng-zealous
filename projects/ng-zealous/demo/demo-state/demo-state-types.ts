import { WritableSignal } from '@angular/core';

export type ZDemoPropConfig<T> = Partial<{
  defaultValue: T;
  withHeading?: string;
}>;

export type ZDemoProp<T> = WritableSignal<T> & {
  next(): void;
  values: T[];
  config: ZDemoPropConfig<T>;
};

export type ZDemoState<T> = Record<keyof T, ZDemoProp<T[keyof T]>>;
