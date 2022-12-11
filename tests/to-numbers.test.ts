import { toNumber } from '../src/index';

describe('toNumber', () => {
  it('toNumber - undefined or null', () => {
    expect(toNumber()).toBe(0);
    expect(toNumber(null)).toBe(0);
  });

  it('toNumber - number', () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(42)).toBe(42);
  });

  it('toNumber - boolean', () => {
    expect(toNumber(true)).toBe(1);
    expect(toNumber(false)).toBe(0);
  });

  it('toNumber - string (valid)', () => {
    expect(toNumber('')).toBe(0);
    expect(toNumber('42')).toBe(42);
    expect(toNumber('042')).toBe(42);
    expect(toNumber('42.42')).toBe(42.42);
    expect(toNumber('42.00')).toBe(42);
    expect(toNumber('-42')).toBe(-42);
    expect(toNumber('-42.42')).toBe(-42.42);
    expect(toNumber('0x42')).toBe(0x42);
    expect(toNumber('0X42')).toBe(0x42);
    expect(toNumber('0x042ABCDEF')).toBe(0x42ABCDEF);
    expect(toNumber('0o42')).toBe(0o42); // eslint-disable-line no-octal
    expect(toNumber('0o042')).toBe(0o42); // eslint-disable-line no-octal
    expect(toNumber('0b101010')).toBe(0b101010);
    expect(toNumber('0b00101010')).toBe(0b101010);
  });

  it('toNumber - string (invalid)', () => {
    expect(toNumber('number')).toBe(null);
    expect(toNumber('42.42.42')).toBe(null);
    expect(toNumber('0xQQ')).toBe(null);
    expect(toNumber('0b21')).toBe(null);
  });
});
