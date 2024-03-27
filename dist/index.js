"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMsToString = exports.toNumber = exports.setTimeParsers = exports.toMilliseconds = exports.toBoolean = void 0;
// Convert input argument s to boolean
// if s is a string
//     yes, true, on (case insensitive) => true
//     no, false, off (case insensitive) => false
//     anything else => Boolean(s)
// if s is a number:
//     0 => false
//     anything else => true
const toBoolean = (s) => {
    if (typeof s === 'undefined' || s === null)
        return false;
    if (typeof s === 'boolean')
        return s;
    if (typeof s === 'number')
        return s !== 0;
    if (typeof s === 'string') {
        const res = /(:?(yes|true|on)|(no|false|off)|(\d+))/i.exec(s);
        if (!res)
            return Boolean(s);
        if (typeof res[2] !== 'undefined')
            return true;
        if (typeof res[3] !== 'undefined')
            return false;
        if (typeof res[4] !== 'undefined')
            return +res[4] !== 0;
    }
    return Boolean(s);
};
exports.toBoolean = toBoolean;
let timeParsers = [
    // "X"
    { re: /^(\d+)$/, f: (res) => +res[1] },
    // "X ms" or "X millisecond(s)"
    { re: /^(\d+) *(:?ms|milliseconds?)$/, f: (res) => +res[1] },
    // "X s" or "X sec" or "X second(s)"
    { re: /^(\d+(\.\d+)?) *(:?s|sec|seconds?)$/, f: (res) => +res[1] * 1000 },
    // "X m" or "X min" or "X minute(s)"
    { re: /^(\d+(\.\d+)?) *(:?m|min|minutes?)$/, f: (res) => +res[1] * 60 * 1000 },
    // X hours
    { re: /^(\d+(\.\d+)?) *(:?h|hours?)$/, f: (res) => +res[1] * 3600 * 1000 },
    // time in format mm:ss
    { re: /^(\d{1,2}):(\d{2})$/, f: (res) => +res[1] * 60 * 1000 + +res[2] * 1000 },
    // time in format hh:mm:ss
    { re: /^(\d{1,2}):(\d{2}):(\d{2})$/, f: (res) => +res[1] * 3600 * 1000 + +res[2] * 60 * 1000 + +res[3] * 1000 },
];
// Convert input argument s to milliseconds
const toMilliseconds = (s) => {
    if (!s)
        return 0;
    if (typeof s === 'number')
        return s;
    if (typeof s !== 'string')
        throw new Error('Expected string or number');
    const parsers = timeParsers;
    const trimmed = s.trim();
    for (let i = 0; i < parsers.length; i++) {
        const { re, f } = parsers[i];
        const res = re.exec(trimmed);
        if (res)
            return f(res);
    }
    return null;
};
exports.toMilliseconds = toMilliseconds;
// Set Time parsers - can be used for localization
const setTimeParsers = (parsers) => {
    timeParsers = parsers;
};
exports.setTimeParsers = setTimeParsers;
// convert input argument s to number
const toNumber = (s) => {
    if (!s)
        return 0;
    // if (typeof s === 'undefined' || s === null) return 0;
    if (typeof s === 'boolean')
        return Number(s);
    if (typeof s === 'number')
        return s;
    let s1 = s.toLowerCase();
    if (typeof s === 'string') {
        let base = 10;
        if (s1.indexOf('0x') === 0) {
            s1 = s1.slice(2);
            base = 16;
        }
        else if (s1.indexOf('0b') === 0) {
            s1 = s1.slice(2);
            base = 2;
        }
        else if (s1.indexOf('0o') === 0) {
            s1 = s1.slice(2);
            base = 8;
        }
        const res = base === 10 ? +s : Number.parseInt(s1, base);
        if (Number.isNaN(res))
            return null;
        return res;
    }
    return null;
};
exports.toNumber = toNumber;
const formatClockValue = (value) => (+value < 10
    ? `0${value.toString().split('.')[0]}`
    : `${value.toString().split('.')[0]}`);
const setPrecision = (value, p) => (p ? value.toFixed(p) : value.toString().split('.')[0]);
const reverseTimeParsers = new Map([
    ['ms', (ms) => `${ms} ms`],
    ['ss', (ms, p, c) => `${setPrecision((c ? ms % 60000 : ms) / 1000, p)} sec`],
    ['mm', (ms, p, c) => `${setPrecision((c ? ms % 3600000 : ms) / 1000 / 60, p)} min`],
    ['hh', (ms, p) => `${setPrecision(ms / 1000 / 60 / 60, p)} h`],
    ['hh:mm', (ms) => `${formatClockValue(ms / 1000 / 60 / 60)}:${formatClockValue((ms % (1000 * 60 * 60)) / 1000 / 60)}`],
    ['hh:mm:ss', (ms) => `${formatClockValue(ms / 1000 / 60 / 60)}:${formatClockValue((ms % (1000 * 60 * 60)) / 1000 / 60)}:${formatClockValue((ms % (1000 * 60)) / 1000)}`],
]);
const fromMsToString = (ms, format, precision) => {
    if (!ms)
        return null;
    return format.split(' ').reduce((acc, f, i) => {
        const parser = reverseTimeParsers.get(f);
        if (!parser)
            throw new Error(`Unsupported format: ${f}`);
        return [...acc, parser(ms, precision, i > 0)];
    }, []).join(' ');
};
exports.fromMsToString = fromMsToString;
//# sourceMappingURL=index.js.map