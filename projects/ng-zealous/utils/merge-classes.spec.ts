import { mergeClasses } from './merge-classes';

describe('mergeClasses', () => {
  it('should merge multiple class strings', () => {
    const result = mergeClasses('foo', 'bar', 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('should filter out false values', () => {
    const result = mergeClasses('foo', false, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should filter out null values', () => {
    const result = mergeClasses('foo', null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should filter out undefined values', () => {
    const result = mergeClasses('foo', undefined, 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle mixed falsy values', () => {
    const result = mergeClasses('foo', false, null, undefined, 'bar', false, 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('should return empty string when all values are falsy', () => {
    const result = mergeClasses(false, null, undefined);
    expect(result).toBe('');
  });

  it('should return empty string when no arguments are provided', () => {
    const result = mergeClasses();
    expect(result).toBe('');
  });

  it('should handle single class string', () => {
    const result = mergeClasses('foo');
    expect(result).toBe('foo');
  });

  it('should filter out empty strings', () => {
    const result = mergeClasses('foo', '', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional class names', () => {
    const isActive = true;
    const isDisabled = false;
    const result = mergeClasses('base', isActive && 'active', isDisabled && 'disabled');
    expect(result).toBe('base active');
  });
});
