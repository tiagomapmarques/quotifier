
export interface ValueObject {
  [key: string]: Value;
}
export type NonIterable = string | ValueObject;

export type Value = ValueArray | NonIterable;

export type ValueArray = NonIterable[];

export type ValueObjectOrArray = ValueObject | ValueArray;
