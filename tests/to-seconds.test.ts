import { toSeconds } from '../src';

describe('toSeconds', () => {
  it('should convert to seconds', () => {
    expect(toSeconds(60)).toBe(60);
    expect(toSeconds('1 second')).toBe(1);
    expect(toSeconds('10sec')).toBe(10);
    expect(toSeconds('10 seconds')).toBe(10);
    expect(toSeconds('10  sec ')).toBe(10);
    expect(toSeconds('10 s')).toBe(10);
    expect(toSeconds('0.5 sec')).toBe(0);
    expect(toSeconds('1.5 sec')).toBe(1);

    expect(toSeconds('1 minute')).toBe(60);
    expect(toSeconds('10 m')).toBe(600);
    expect(toSeconds('10 min')).toBe(600);
    expect(toSeconds('10 minutes')).toBe(600);
    expect(toSeconds('0.5 min')).toBe(30);
    expect(toSeconds('1.5 min')).toBe(90);

    expect(toSeconds('1 hour')).toBe(3600);
    expect(toSeconds('10 h')).toBe(36000);
    expect(toSeconds('10 hours')).toBe(36000);
    expect(toSeconds('0.2 h')).toBe(720);

    expect(toSeconds('1:30')).toBe(90);

    expect(toSeconds('1 day')).toBe(86400);
  });
});
