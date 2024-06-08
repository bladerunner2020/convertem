/**
 * Converts input argument `s` to boolean.
 *
 * @param s - The input to convert.
 *
 * If `s` is a string:
 * - 'yes', 'true', 'on' (case insensitive) => true
 * - 'no', 'false', 'off' (case insensitive) => false
 * - anything else => Boolean(s)
 *
 * If `s` is a number:
 * - 0 => false
 * - anything else => true
 */
export const toBoolean = (s?: boolean | number | string | null): boolean => {
  if (typeof s === 'undefined' || s === null) return false;
  if (typeof s === 'boolean') return s;
  if (typeof s === 'number') return s !== 0;
  if (typeof s === 'string') {
    const res = /(:?(yes|true|on)|(no|false|off)|(\d+))/i.exec(s);
    if (!res) return Boolean(s);
    if (typeof res[2] !== 'undefined') return true;
    if (typeof res[3] !== 'undefined') return false;
    if (typeof res[4] !== 'undefined') return +res[4] !== 0;
  }
  return Boolean(s);
};

/**
 * Type that represents time parser
 */
export type TimeParser = {
  re: RegExp,
  f: (res: string[]) => number
};

/**
 * Default time parsers
 */
export const DEFAULT_TIME_PARSERS: TimeParser[] = [
  // "X"
  { re: /^([-+]?\d+)$/, f: (res) => +res[1] },
  // "X ms" or "X millisecond(s)"
  { re: /^([-+]?\d+) *(:?ms|milliseconds?)$/, f: (res) => +res[1] },
  // "X s" or "X sec" or "X second(s)"
  { re: /^([-+]?\d+(\.\d+)?) *(:?s|sec|seconds?)$/, f: (res) => +res[1] * 1000 }, // seconds
  // "X m" or "X min" or "X minute(s)"
  { re: /^([-+]?\d+(\.\d+)?) *(:?m|min|minutes?)$/, f: (res) => +res[1] * 60 * 1000 },
  // X hours
  { re: /^([-+]?\d+(\.\d+)?) *(:?h|hours?)$/, f: (res) => +res[1] * 3600 * 1000 },
  // time in format mm:ss
  { re: /^([-+]?\d{1,2}):(\d{2})$/, f: (res) => +res[1] * 60 * 1000 + +res[2] * 1000 },
  // time in format hh:mm:ss
  { re: /^([-+]?\d{1,2}):(\d{2}):(\d{2})$/, f: (res) => +res[1] * 3600 * 1000 + +res[2] * 60 * 1000 + +res[3] * 1000 },
  // time in format X d or X day(s)
  { re: /^([-+]?\d+(\.\d+)?) *(:?d|days?)$/, f: (res) => +res[1] * 24 * 3600 * 1000 },
];

let timeParsers: TimeParser[] = DEFAULT_TIME_PARSERS;

/**
 * Convert input argument s to milliseconds.
 * If input is a number, it will be returned as is.
 * If input is a string, it will be converted to milliseconds
 * @param s - number of milliseconds or string representing period of time.
 * @returns - number of milliseconds or null if conversion failed
 * @example
 * - toMilliseconds(1000) => 1000
 * - toMilliseconds('1 second') => 1000
 * - toMilliseconds('10sec') => 10000
 * - toMilliseconds('10 seconds') => 10000
 * - toMilliseconds('10  sec ') => 10000
 * - toMilliseconds('10 s') => 10000
 * - toMilliseconds('0.5 sec') => 500
 * - toMilliseconds('1.5 sec') => 1500
 * - toMilliseconds('1 minute') => 60000
 */
export const toMilliseconds = (s?: string | number): number | null => {
  if (!s) return 0;

  if (typeof s === 'number') return s;
  if (typeof s !== 'string') throw new Error('Expected string or number');

  const parsers = timeParsers;

  const trimmed = s.trim();
  for (const parser of parsers) {
    const { re, f } = parser;
    const res = re.exec(trimmed);
    if (res) return f(res);
  }

  return null;
};
/**
 * Convert input argument s to seconds.
 * If input is a number, it will be returned as is.
 * If input is a string, it will be converted to seconds
 * @param s - number of seconds or string representing period of time.
 * @returns - number of seconds or null if conversion failed
 * @example
 * - toSeconds(60) => 60
 * - toSeconds('1 minute') => 60
 * - toSeconds('10min') => 600
 */
export const toSeconds = (s?: string | number): number | null => {
  if (typeof s === 'number') return s;
  const ms = toMilliseconds(s);
  if (ms === null) return null;
  return Math.floor(ms / 1000);
};

/**
 * Convert input argument s to minutes.
 * If input is a number, it will be returned as is.
 * If input is a string, it will be converted to minutes
 * @param s - number of minutes or string representing period of time.
 * @returns - number of minutes or null if conversion failed
 * @example
 * - toMinutes(10) => 10
 * - toMinutes('1 minute') => 1
 * - toMinutes('10min') => 10
 * - toMinutes('60 sec') => 1
 * - toMinutes('1:30') => 1
 * - toMinutes('1 hour') => 60
 */
export const toMinutes = (s?: string | number): number | null => {
  if (typeof s === 'number') return s;
  const ms = toMilliseconds(s);
  if (ms === null) return null;
  return Math.floor(ms / 1000 / 60);
};

/**
 * Convert input argument s to hours.
 * If input is a number, it will be returned as is.
 * If input is a string, it will be converted to hours
 * @param s - number of hours or string representing period of time.
 * @returns - number of hours or null if conversion failed
 * @example
 * - toHours(5) => 5
 * - toHours('1 hour') => 1
 * - toHours('10h') => 10
 * - toHours('10 hours') => 10
 * - toHours('120 min ') => 2
 * - toHours('1:30') => 0
 * - toHours('1 day') => 24
 */
export const toHours = (s?: string | number): number | null => {
  if (typeof s === 'number') return s;
  const ms = toMilliseconds(s);
  if (ms === null) return null;
  return Math.floor(ms / 1000 / 60 / 60);
};

/**
 * Set time parsers for converting string to milliseconds
 * can be used for localization
 * @param parsers - array of time parsers
 * @see DEFAULT_TIME_PARSERS
 */
export const setTimeParsers = (parsers: TimeParser[] = DEFAULT_TIME_PARSERS) => {
  timeParsers = parsers;
};

/**
 * Convert input argument `s` to number
 * @param s - input argument
 * @returns - number or null if conversion failed
 */
export const toNumber = (s?: string | boolean | number): number | null => {
  if (!s) return 0;
  if (typeof s === 'boolean') return Number(s);
  if (typeof s === 'number') return s;

  let s1 = s.toLowerCase();
  if (typeof s === 'string') {
    let base = 10;
    if (s1.startsWith('0x')) {
      s1 = s1.slice(2);
      base = 16;
    } else if (s1.startsWith('0b')) {
      s1 = s1.slice(2);
      base = 2;
    } else if (s1.startsWith('0o')) {
      s1 = s1.slice(2);
      base = 8;
    }
    const res = base === 10 ? +s : Number.parseInt(s1, base);
    if (Number.isNaN(res)) return null;
    return res;
  }
  return null;
};

const formatClockValue = (value: number): string => (
  +value < 10
    ? `0${value.toString().split('.')[0]}`
    : `${value.toString().split('.')[0]}`
);
const setPrecision = (value: number, p?: number) => (p ? value.toFixed(p) : value.toString().split('.')[0]);
const reverseTimeParsers: Map<string, (
  ms: number,
  precision?: number,
  crop?: boolean
) => string> = new Map([
  ['ms', (ms) => `${ms} ms`],
  ['ss', (ms, p, c) => `${setPrecision((c ? ms % 60000 : ms) / 1000, p)} sec`],
  ['mm', (ms, p, c) => `${setPrecision((c ? ms % 3600000 : ms) / 1000 / 60, p)} min`],
  ['hh', (ms, p) => `${setPrecision(ms / 1000 / 60 / 60, p)} h`],
  ['hh:mm', (ms) => `${
    formatClockValue(ms / 1000 / 60 / 60)
  }:${
    formatClockValue((ms % (1000 * 60 * 60)) / 1000 / 60)
  }`],
  ['hh:mm:ss', (ms) => `${
    formatClockValue(ms / 1000 / 60 / 60)
  }:${
    formatClockValue((ms % (1000 * 60 * 60)) / 1000 / 60)
  }:${
    formatClockValue((ms % (1000 * 60)) / 1000)
  }`],
]);

/**
 * Convert milliseconds to string
 * @param ms - number of milliseconds
 * @param format - format of output string
 * @param precision - number of digits after the decimal point
 * @returns - string representation of milliseconds or null if conversion failed
 * @example
 * - fromMsToString(1000, 'ss') => '1 sec'
 * - fromMsToString(540000, 'ss') => '540 sec'
 * - fromMsToString(1000, 'mm') => '0 min'
 * - fromMsToString(60000, 'mm') => '1 min'
 */
export const fromMsToString = (ms?: number, format?: string, precision?: number): string | null => {
  if (!ms) return null;

  return format.split(' ').reduce((acc, f, i) => {
    const parser = reverseTimeParsers.get(f);
    if (!parser) throw new Error(`Unsupported format: ${f}`);

    return [...acc, parser(ms, precision, i > 0)];
  }, []).join(' ');
};
