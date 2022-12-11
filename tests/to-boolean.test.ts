import { toBoolean } from '../src/index';

describe('toBoolean', () => {
  it('null or undefined', () => {
    expect(toBoolean()).toBe(false);
    expect(toBoolean(null)).toBe(false);
  });

  it('boolean', () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean(false)).toBe(false);
  });

  it('number', () => {
    expect(toBoolean(0)).toBe(false);
    expect(toBoolean(1)).toBe(true);
    expect(toBoolean(42)).toBe(true);
    expect(toBoolean(-1)).toBe(true);
  });

  it('string', () => {
    expect(toBoolean('1')).toBe(true);
    expect(toBoolean('0001')).toBe(true);
    expect(toBoolean('yes')).toBe(true);
    expect(toBoolean('YES')).toBe(true);
    expect(toBoolean('true')).toBe(true);
    expect(toBoolean('True ')).toBe(true);
    expect(toBoolean('TRUE ')).toBe(true);
    expect(toBoolean('on')).toBe(true);
    expect(toBoolean('Alexander')).toBe(true);

    expect(toBoolean('0')).toBe(false);
    expect(toBoolean('00')).toBe(false);
    expect(toBoolean('no')).toBe(false);
    expect(toBoolean('NO')).toBe(false);
    expect(toBoolean('false')).toBe(false);
    expect(toBoolean('False ')).toBe(false);
    expect(toBoolean('FALSE ')).toBe(false);
    expect(toBoolean('off')).toBe(false);
    expect(toBoolean('')).toBe(false);
  });
});
