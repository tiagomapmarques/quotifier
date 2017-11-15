import * as isArray from 'isarray';
import * as quote from 'quote';
import * as unquote from 'unquote';

import * as Quotifier from './types';

type Handler = typeof quote | typeof unquote;

type IteratorHandler = (value: Quotifier.Value) => Quotifier.Value;

const arrayReduce = (object: Quotifier.ValueArray, handler: IteratorHandler) => object.map(handler) as Quotifier.ValueArray;

const objectReduce = (object: Quotifier.ValueObject, handler: IteratorHandler) => Object.keys(object).reduce((collection, key) => ({
  ...collection,
  [key]: handler(object[key]),
}), {}) as Quotifier.ValueObject;

const transformer = (keyHandler: Handler) => (element: Quotifier.Value): Quotifier.Value => {
  return typeof element === 'string' ? keyHandler(element) : quotifyAction(keyHandler)(element); // tslint:disable-line:no-use-before-declare
};

const quotifyAction = (keyHandler: Handler) => (object: Quotifier.ValueObjectOrArray) => {
  if (isArray(object)) {
    return arrayReduce(object as Quotifier.ValueArray, transformer(keyHandler));
  }
  return objectReduce(object as Quotifier.ValueObject, transformer(keyHandler));
};

export const quotifier = quotifyAction(quote);

export const unquotifier = quotifyAction(unquote);
