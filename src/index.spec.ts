import * as js from '../lib';
import * as ts from './';

describe('quotifier', () => {
  const testData = [
    {
      test: 'works for a simple object',
      input: { var: 'variable_1' },
      output: { var: '"variable_1"' },
    },
    {
      test: 'maintains strings in keys',
      input: { 'Var-1?': 'variable-1' },
      output: { 'Var-1?': '"variable-1"' },
    },
    {
      test: 'works for a simple array',
      input: [ 'var-1', 'variable-1' ],
      output: [ '"var-1"', '"variable-1"' ],
    },
    {
      test: 'works for complex objects',
      input: {
        var: 'variable_1',
        var2: [
          { var3: 'variable|3' },
          { var4: [ 'variable|4' ] },
        ],
      },
      output: {
        var: '"variable_1"',
        var2: [
          { var3: '"variable|3"' },
          { var4: [ '"variable|4"' ] },
        ],
      },
    },
  ];

  testData.forEach(({ test, input, output }) => {
    describe(test, () => {
      describe('on typescript', () => {
        it(`quotify works`, () => {
          expect(ts.quotifier(input)).toEqual(output);
        });

        it(`unquotify works`, () => {
          expect(ts.unquotifier(output)).toEqual(input);
        });
      });

      describe('on javascript', () => {
        it(`quotify works`, () => {
          expect(js.quotifier(input)).toEqual(output);
        });
        it(`unquotify works`, () => {
          expect(js.unquotifier(output)).toEqual(input);
        });
      });
    });
  });
});
