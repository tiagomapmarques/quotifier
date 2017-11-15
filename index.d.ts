
declare module 'quotifier' {
  interface ValueObject {
    [key: string]: Value;
  }
  type NonIterable = string | ValueObject;

  type Value = ValueArray | NonIterable;

  type ValueArray = NonIterable[];

  type ValueObjectOrArray = ValueObject | ValueArray;

  const quotifier: (element: ValueObjectOrArray) => ValueObjectOrArray;
  const unquotifier: (element: ValueObjectOrArray) => ValueObjectOrArray;
}
