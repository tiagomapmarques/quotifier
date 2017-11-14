import * as isArray from 'isarray';
import * as quote from 'quote';
import * as unquote from 'unquote';

import { QuotifierObjectValue, QuotifierArray, QuotifierObject, QuotifierArrayOrObject, IteratorHandler } from '../index.d';

type Handler = typeof quote | typeof unquote;

const arrayReduce = (object: QuotifierArray, handler: IteratorHandler) => object.map(handler) as QuotifierArray;

const objectReduce = (object: QuotifierObject, handler: IteratorHandler) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: handler(object[key]),
}), {}) as QuotifierObject;

const transformer = (keyHandler: Handler) => (element: QuotifierObjectValue): QuotifierObjectValue => {
  return typeof element === 'string' ? keyHandler(element) : quotifyAction(keyHandler)(element); // tslint:disable-line:no-use-before-declare
};

const quotifyAction = (keyHandler: Handler) => (object: QuotifierArrayOrObject) => {
  if (isArray(object)) {
    return arrayReduce(object as QuotifierArray, transformer(keyHandler));
  }
  return objectReduce(object as QuotifierObject, transformer(keyHandler));
};

export const quotifier = quotifyAction(quote);

export const unquotifier = quotifyAction(unquote);
