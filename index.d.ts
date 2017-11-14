
export type QuotifierObjectNonIterable = string | QuotifierObject;
export type QuotifierObjectValue = QuotifierArray | QuotifierObjectNonIterable;

export type QuotifierArray = QuotifierObjectNonIterable[];
export type QuotifierObject = { [key: string]: QuotifierObjectValue };
export type QuotifierArrayOrObject = QuotifierObject | QuotifierArray;

export type IteratorHandler = (value: QuotifierObjectValue) => QuotifierObjectValue;
