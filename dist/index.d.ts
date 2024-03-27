export declare const toBoolean: (s?: boolean | number | string | null) => boolean;
export type TimeParser = {
    re: RegExp;
    f: (res: string[]) => number;
};
export declare const toMilliseconds: (s?: string | number) => number | null;
export declare const setTimeParsers: (parsers: TimeParser[]) => void;
export declare const toNumber: (s?: string | boolean | number) => number | null;
export declare const fromMsToString: (ms?: number, format?: string, precision?: number) => string | null;
