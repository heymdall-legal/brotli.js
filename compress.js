var brotli = require('./build/encode');

/**
 * Compresses the given buffer
 * The second parameter is optional and specifies whether the buffer is
 * text or binary data (the default is binary).
 * Returns null on error
 */
module.exports = function(buffer, opts) {
  // default to binary data
  var quality = 11;
  var mode = 0;
  var lgwin = 22;
  var dictionary = "";

  if (typeof opts === 'object') {
    quality = opts.quality || quality;
    mode = opts.mode || mode;
    lgwin = opts.lgwin || lgwin;
    dictionary = opts.dictionary || dictionary;
  }

  // allocate input buffer and copy data to it
  var buf = brotli._malloc(buffer.length);
  brotli.HEAPU8.set(buffer, buf);

  // allocate dictionary buffer and copy data to it
  var dict = brotli._malloc(dictionary.length);
  brotli.HEAPU8.set(dictionary, dict);
  // allocate output buffer (same size + some padding to be sure it fits), and encode
  var outBuf = brotli._malloc(buffer.length + 1024);
  var encodedSize = brotli._encodeWithDictionary(quality, lgwin, mode, buffer.length, buf, dictionary.length, dict, buffer.length + 1024, outBuf);

  var outBuffer = null;
  if (encodedSize !== -1) {
    // allocate and copy data to an output buffer
    outBuffer = new Uint8Array(encodedSize);
    outBuffer.set(brotli.HEAPU8.subarray(outBuf, outBuf + encodedSize));
  }

  // free malloc'd buffers
  brotli._free(buf);
  brotli._free(outBuf);

  return outBuffer;
};
