import { Buffer } from 'buffer';
import * as cryptoJs from 'crypto-js';
declare function pkcs5Padding(plainText: Uint8Array): Uint8Array;
declare function PKCS5UnPadding(data: cryptoJs.lib.WordArray): cryptoJs.lib.WordArray;
declare function generateRandIV(size: number): cryptoJs.lib.WordArray;
declare function PKCS5Padding(data: string): cryptoJs.lib.WordArray;
declare function wordArrayToBuffer(wordArray: cryptoJs.lib.WordArray): Buffer;
declare function bufferToWordArray(buffer: Buffer): cryptoJs.lib.WordArray;
declare const _default: {
    checkKeyInput: (key: any) => void | Error;
    generateRandomIV: (size?: number) => string;
    generateRandIV: typeof generateRandIV;
    wordArrayToBuffer: typeof wordArrayToBuffer;
    bufferToWordArray: typeof bufferToWordArray;
    PKCS5Padding: typeof PKCS5Padding;
    pkcs5Padding: typeof pkcs5Padding;
    PKCS5UnPadding: typeof PKCS5UnPadding;
    KEY_SIZE_1KB: number;
    KEY_SIZE_2KB: number;
    KEY_SIZE_4KB: number;
    HMAC_MINIMUM_KEY_SIZE: number;
    AES_128_KEY_SIZE: number;
    AES_192_KEY_SIZE: number;
    AES_256_KEY_SIZE: number;
};
export default _default;
