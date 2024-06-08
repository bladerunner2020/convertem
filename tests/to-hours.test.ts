import { toHours } from '../src';

describe('toHours', () => {
  it('should convert to hours', () => {
    expect(toHours(5)).toBe(5);
    expect(toHours('1 hour')).toBe(1);
    expect(toHours('10h')).toBe(10);
    expect(toHours('10 hours')).toBe(10);
    expect(toHours('10  h ')).toBe(10);
    expect(toHours('10 h')).toBe(10);
    expect(toHours('0.5 hour')).toBe(0);
    expect(toHours('1.5 hours')).toBe(1);

    expect(toHours('1 minute')).toBe(0);
    expect(toHours('60 m')).toBe(1);
    expect(toHours('120 min')).toBe(2);
    expect(toHours('180 minutes')).toBe(3);
    expect(toHours('0.5 min')).toBe(0);
    expect(toHours('30 min')).toBe(0);

    expect(toHours('1 second')).toBe(0);
    expect(toHours('3600 s')).toBe(1);
    expect(toHours('7200 sec')).toBe(2);
    expect(toHours('10800 seconds')).toBe(3);
    expect(toHours('0.5 sec')).toBe(0);
    expect(toHours('1800 sec')).toBe(0);

    expect(toHours('1:30')).toBe(0);

    expect(toHours('1 day')).toBe(24);
  });
});
