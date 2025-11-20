import { ZDemoState } from './demo-state-types';

/**
 * Utility designed to help updating `zDemoProp` from URL query param.
 *
 * @param demoState The state to update
 * @param command The command as unsafe string
 *
 * @example
 * ```ts
 * const demoState = {
 *   size: zDemoProp(['small', 'medium', 'large]),
 *   color: zDemoProp(['blue', 'green']),
 * };
 *
 * const command = '{ "size": "medium" }';
 *
 * _patchZDemoStateWithUnsafeCommand(demoState, command);
 * ```
 */
export const _patchZDemoStateWithUnsafeCommand = <T>(demoState: ZDemoState<T>, command: string) => {
  try {
    Object.entries(JSON.parse(command)).forEach(([prop, value]) => {
      const demoProp = demoState[prop as keyof T] as ZDemoState<T>[keyof T] | undefined;
      if (!demoProp) {
        console.error('_patchZDemoStateWithUnsafeCommand: invalid prop', prop);
        return;
      }
      if (!(demoProp.values as unknown[]).includes(value)) {
        console.error('_patchZDemoStateWithUnsafeCommand: invalid value', value);
        return;
      }

      demoProp.set(value as T[keyof T]); // The `prop` and `value` look fine! Let's update the signal.
    });
  } catch {
    console.error('_patchZDemoStateWithUnsafeCommand: invalid command', command);
  }
};
