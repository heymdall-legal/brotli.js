# Brotli-dictionary

Based on [brotli.js](https://github.com/foliojs/brotli.js)

Brotli-dictionary is port of the [Brotli](http://tools.ietf.org/html/draft-alakuijala-brotli-01) compression algorithm to JavaScript with Emscripten. The original C++ source code can be found [here](http://github.com/google/brotli).

Key difference from [native brotli](https://nodejs.org/api/zlib.html#class-brotlioptions) implementation in zlib module is support of custom dictionary option.

## Compatibility

I did not test compatibility of this module with browser, and all tests only run in nodejs enviroment.

## Installation and usage

Install using npm.

```shell
npm install brotli-dictionary
```

```js
const fs = require('fs');
const brotli = require('bortli-dictionary');

const inputFile = fs.readFileSync('path/to/file');
const dictionary = fs.readFileSync('path/to/dictionary');

const buffer = brotli.compress(inputFile, {
    mode: 0, // 0 = generic, 1 = text, 2 = font (WOFF2), 0 by default
    quality: 11, // 0 - 11, 11 by default
    lgwin: 22, // window size, 22 by default
    dictionary, // dictionary buffer, empty by default
});

```

## License

MIT
