# quotifier
Functions to recursively add and remove quotes to strings inside objects or
arrays.

## Usage

```javascript
import { quotifier, unquotifier } from 'quotifier';

const withQuotes = quotifier({       // {
  myVariable: 'production',          //   myVariable: '"production"',
});                                  // }

const withoutQuotes = unquotifier([  // [
  '"production"',                    //  'production',
]);                                  // ]

// it will also do this recursively inside the object or array that it is given:

const deeperQuotes = quotifier({     // {
  myVariable: [                      //   myVariable: [
    'production',                    //     '"production"',
    {                                //     {
      'other-variable': [ 'yeah' ],  //       'other-variable': [ '"yeah"' ],
    }                                //     },
  ],                                 //   ],
  'JustBecause?': 'yup',             //   'JustBecause?': '"yup"',
});                                  // }
```

## Why I use it

To define variables for `Webpack.DefinePlugin` and then re-use that code to
to test the components/scripts that use those variables defined by the plugin.

## Known limitations

Does not deal with any other data types aside from objects, arrays and
strings... yet.
