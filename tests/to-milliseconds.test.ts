import { setTimeParsers, toMilliseconds, TimeParser } from '../src/index';

const RU_TIME_PARSERS: TimeParser[] = [
  // "X"
  { re: /^(\d+)$/, f: (res) => +res[1] },
  // "X ms" or "X millisecond(s)"
  { re: /^(\d+(\.\d+)?) *мс$/, f: (res) => +res[1] },
  // "X s" or "X sec" or "X second(s)"
  { re: /^(\d+(\.\d+)?) *(:?с|сек|секунд.?)$/, f: (res) => +res[1] * 1000 }, // seconds
  // "X m" or "X min" or "X minute(s)"
  { re: /^(\d+(\.\d+)?) *(:?м|мин|минут.?)$/, f: (res) => +res[1] * 60 * 1000 },
  // X hours
  { re: /^(\d+(\.\d+)?) *(:?ч|час|часа|часов)$/, f: (res) => +res[1] * 3600 * 1000 },
  // time in format mm:ss
  { re: /^(\d{1,2}):(\d{2})$/, f: (res) => +res[1] * 60 * 1000 + +res[2] * 1000 },
  // time in format hh:mm:ss
  { re: /^(\d{1,2}):(\d{2}):(\d{2})$/, f: (res) => +res[1] * 3600 * 1000 + +res[2] * 60 * 1000 + +res[3] * 1000 },
];

describe('toMilliseconds', () => {
  it('null or undefined', () => {
    expect(toMilliseconds()).toBe(0);
    expect(toMilliseconds(null)).toBe(0);
  });

  it('toMilliseconds - numbers', () => {
    expect(toMilliseconds(0)).toBe(0);
    expect(toMilliseconds(1000)).toBe(1000);
  });

  it('ms, sec, min, hours', () => {
    expect(toMilliseconds('1 second')).toBe(1000);
    expect(toMilliseconds('10sec')).toBe(10000);
    expect(toMilliseconds('10 seconds')).toBe(10000);
    expect(toMilliseconds('10  sec ')).toBe(10000);
    expect(toMilliseconds('10 s')).toBe(10000);
    expect(toMilliseconds('0.5 sec')).toBe(500);

    expect(toMilliseconds('1 minute')).toBe(60000);
    expect(toMilliseconds('10 m')).toBe(600000);
    expect(toMilliseconds('10 min')).toBe(600000);
    expect(toMilliseconds('10 minutes')).toBe(600000);
    expect(toMilliseconds('0.5 min')).toBe(30000);

    expect(toMilliseconds('1 hour')).toBe(3600000);
    expect(toMilliseconds('10 h')).toBe(36000000);
    expect(toMilliseconds('10 hours')).toBe(36000000);
    expect(toMilliseconds('0.2 h')).toBe(3600000 * 0.2);
  });

  it('time format mm:ss', () => {
    expect(toMilliseconds('1:30')).toBe(90000);
  });

  it('should convert to milliseconds using localization', () => {
    setTimeParsers(RU_TIME_PARSERS);
    expect(toMilliseconds(1000)).toBe(1000);
    expect(toMilliseconds('1 с')).toBe(1000);
    expect(toMilliseconds('1 сек')).toBe(1000);
    expect(toMilliseconds('1 секунда')).toBe(1000);
    expect(toMilliseconds('2 секунды')).toBe(2000);
    expect(toMilliseconds('10сек')).toBe(10000);
    expect(toMilliseconds('10 секунд')).toBe(10000);
    expect(toMilliseconds('10  сек ')).toBe(10000);
    expect(toMilliseconds('10 с')).toBe(10000);

    expect(toMilliseconds('1 м')).toBe(60000);
    expect(toMilliseconds('1 мин')).toBe(60000);
    expect(toMilliseconds('1 минута')).toBe(60000);
    expect(toMilliseconds('2 минуты')).toBe(120000);
    expect(toMilliseconds('10 м')).toBe(600000);
    expect(toMilliseconds('10 мин')).toBe(600000);
    expect(toMilliseconds('10 минут')).toBe(600000);

    expect(toMilliseconds('1 час')).toBe(3600000);
    expect(toMilliseconds('1 ч')).toBe(3600000);
    expect(toMilliseconds('3 часа')).toBe(3600000 * 3);
    expect(toMilliseconds('3 час')).toBe(3600000 * 3);
    expect(toMilliseconds('3 ч')).toBe(3600000 * 3);
    expect(toMilliseconds('10 часов')).toBe(36000000);
    expect(toMilliseconds('10 ч')).toBe(36000000);
  });
});
