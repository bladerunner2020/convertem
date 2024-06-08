import { toMinutes } from '../src';

describe('toMinutes', () => {
  it('should convert to minutes', () => {
    expect(toMinutes(10)).toBe(10);
    expect(toMinutes('1 minute')).toBe(1);
    expect(toMinutes('10min')).toBe(10);
    expect(toMinutes('10 minutes')).toBe(10);
    expect(toMinutes('10  min ')).toBe(10);
    expect(toMinutes('10 m')).toBe(10);
    expect(toMinutes('0.5 min')).toBe(0);
    expect(toMinutes('1.5 min')).toBe(1);

    expect(toMinutes('1 hour')).toBe(60);
    expect(toMinutes('10 h')).toBe(600);
    expect(toMinutes('10 hours')).toBe(600);
    expect(toMinutes('0.2 h')).toBe(12);

    expect(toMinutes('1:30')).toBe(1);

    expect(toMinutes('1 day')).toBe(1440);
  });
});
