import { ZClickNavigationParams } from './click-types';

export const _isNavigationParams = (params?: unknown): params is ZClickNavigationParams => {
  const commands: keyof ZClickNavigationParams = 'commands';
  return !!(params && typeof params === 'object' && commands in params);
};

export const _isNavigationCommands = (params?: unknown): params is ZClickNavigationParams['commands'] => {
  return Array.isArray(params);
};
