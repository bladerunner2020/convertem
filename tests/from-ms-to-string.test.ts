import { fromMsToString } from '../src';

describe('fromMsToString', () => {
  it('null or undefined value', () => {
    expect(fromMsToString(null, 'ms')).toBe(null);
    expect(fromMsToString(undefined, 'ms')).toBe(null);
  });

  it('ms', () => {
    expect(fromMsToString(1000, 'ms')).toBe('1000 ms');
    expect(fromMsToString(540000, 'ms')).toBe('540000 ms');
  });

  it('ss', () => {
    expect(fromMsToString(1000, 'ss')).toBe('1 sec');
    expect(fromMsToString(1541, 'ss')).toBe('1 sec');
    expect(fromMsToString(1541, 'ss', 2)).toBe('1.54 sec');
    expect(fromMsToString(540090000, 'ss')).toBe('540090 sec');
  });

  it('mm', () => {
    expect(fromMsToString(1000, 'mm')).toBe('0 min');
    expect(fromMsToString(60000, 'mm')).toBe('1 min');
    expect(fromMsToString(90000, 'mm')).toBe('1 min');
    expect(fromMsToString(90000, 'mm', 1)).toBe('1.5 min');
    expect(fromMsToString(540090000, 'mm')).toBe('9001 min');
  });

  it('hh', () => {
    expect(fromMsToString(1000, 'hh')).toBe('0 h');
    expect(fromMsToString(3600000, 'hh')).toBe('1 h');
    expect(fromMsToString(5400000, 'hh')).toBe('1 h');
    expect(fromMsToString(5400000, 'hh', 1)).toBe('1.5 h');
    expect(fromMsToString(540090000, 'hh')).toBe('150 h');
  });

  it('hh:mm', () => {
    expect(fromMsToString(1000, 'hh:mm')).toBe('00:00');
    expect(fromMsToString(3600000, 'hh:mm')).toBe('01:00');
    expect(fromMsToString(5400000, 'hh:mm')).toBe('01:30');
    expect(fromMsToString(540090000, 'hh:mm')).toBe('150:01');
  });

  it('hh:mm:ss', () => {
    expect(fromMsToString(1000, 'hh:mm:ss')).toBe('00:00:01');
    expect(fromMsToString(3600000, 'hh:mm:ss')).toBe('01:00:00');
    expect(fromMsToString(5400000, 'hh:mm:ss')).toBe('01:30:00');
    expect(fromMsToString(540090000, 'hh:mm:ss')).toBe('150:01:30');
  });

  it('hh mm ss', () => {
    expect(fromMsToString(3510000, 'hh mm ss')).toBe('0 h 58 min 30 sec');
    expect(fromMsToString(5402000, 'hh mm ss')).toBe('1 h 30 min 2 sec');
    expect(fromMsToString(540090000, 'hh mm ss')).toBe('150 h 1 min 30 sec');
  });
});
