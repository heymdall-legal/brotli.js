type Options = {
    /**
     * LZ77 window size
     */
    lgwin?: number;
    mode?: number;
    /**
     * compression level (0-11); bigger values cause denser, but slower compression
     */
    quality?: number;
    /**
     * used as raw (LZ77) dictionary; same dictionary MUST be used both for compression and decompression
     */
    dictionary?: Uint8Array;
};

/**
 * Compress input with broli
 * @param input 
 * @param options 
 */
export function compress(input: Uint8Array, options?: Options): Uint8Array;
