"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummy = exports.toBoolean = void 0;
const toBoolean = (s) => {
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
exports.dummy = 0;
//# sourceMappingURL=index.js.map