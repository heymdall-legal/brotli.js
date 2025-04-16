var fs = require('fs');
var assert = require('assert');
var brotli = require('../');
var compress = require('../compress');

describe('brotli', function() {
  describe('compress', function() {
    it('should compress some binary data', async function() {
      // We need this timer, because otherwise the brotli object is empty at the time we try to compress.
      await new Promise(r=>setTimeout(r, 10));
      var data = fs.readFileSync('build/encode.js').slice(0, 1024 * 4);
      var res = brotli.compress(data);
      assert(res.length < data.length);
    });

    it('should compress some binary data using standalone version', function() {
      var data = fs.readFileSync('build/encode.js').slice(0, 1024 * 4);
      var res = compress(data);
      assert(res.length < data.length);
    });

    it('should compress some text data', function() {
      this.timeout(100000); // not sure why the first time text data is compressed it is slow...
      var data = fs.readFileSync('build/encode.js', 'utf8').slice(0, 1024 * 4);
      var res = brotli.compress(data, true);
      assert(res.length < data.length);
    });

    it('should compress some text data using standalone version', function() {
      var data = fs.readFileSync('build/encode.js', 'utf8').slice(0, 1024 * 4);
      var res = compress(data, true);
      assert(res.length < data.length);
    });

    it('compress some text with a dictionary', function() {
      var dictionary = fs.readFileSync(__dirname + '/testdata/alice29.txt');
      var data = fs.readFileSync(__dirname + '/testdata/alice30.txt');
      var res = compress(data, { dictionary: dictionary });
      var diff = fs.readFileSync(__dirname + '/testdata/alice30_diff_from_29.txt.sbr');
      assert(res.length == diff.length);
      // The first char of the output is different between our function and the CLI version.
      // It presumably represents the window size difference when encoding. It has no impact
      // on decoding outcomes.
      assert.deepEqual(res.slice(1), diff.slice(1));
    });

    it('should compress short data', function() {
      let res = compress(Buffer.from([255, 255, 255]));
      assert(res.length > 3);
    });
  });
});
