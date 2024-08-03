"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptWithAes = exports.decryptWithAes = void 0;
const crypto_1 = require("crypto");
const buffer_1 = require("buffer");
const alg_1 = require("./alg");
const key_util_1 = require("./key_util");
const dotenv = require("dotenv");
const types_1 = require("./types");
const cryptoJs = require("crypto-js");
const DEFAULT_AUTH_TAG_LENGTH = 16;
const SUPPORTED_AUTH_TAG_MODES = ['gcm', 'ccm', 'ocb', 'chacha20-poly1305'];
dotenv.config();
/**
 * @param alg {string}
 * @return {{mode: *, ivLen: (number), expectedKeyLen: number}}
 */
const getMetaFromAlgorithm = (alg) => {
    const algSplited = alg.split('-');
    if (algSplited.length < 3) {
        throw new Error('invalid aes algorithm');
    }
    const keyLenInt = parseInt(algSplited[1], 10);
    const ivLen = algSplited[2] === 'cbc' ? 16 : 12;
    return { expectedKeyLen: keyLenInt / 8, mode: algSplited[2], ivLen };
};
/**
 * Shim for difficult createCipheriv method
 *
 * @param algorithm
 * @param key
 * @param iv
 * @param options
 * @returns
 */
const createCipherivShim = (algorithm, key, iv, options) => {
    const cipher = (0, crypto_1.createCipheriv)(algorithm, key, iv, options);
    return cipher;
};
/**
 * Shim for difficult createCipheriv method
 *
 * @param algorithm
 * @param key
 * @param iv
 * @param options
 * @returns
 */
const createDecipherivShim = (algorithm, key, iv, options) => {
    const cipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv, options);
    return cipher;
};
/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
const decrypt = (alg, key, data) => {
    const encryptedBuffer = typeof data === 'string' ? buffer_1.Buffer.from(data, 'hex') : data;
    const keyHex = cryptoJs.enc.Hex.parse(key);
    const iv = encryptedBuffer.slice(0, 16);
    const cipherText = encryptedBuffer.slice(16);
    const ivWordArray = key_util_1.default.bufferToWordArray(iv);
    const ciphertextWordArray = key_util_1.default.bufferToWordArray(cipherText);
    const decrypted = cryptoJs.AES.decrypt({ ciphertext: ciphertextWordArray }, keyHex, {
        iv: ivWordArray,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.NoPadding,
    });
    const decryptedUnpadded = key_util_1.default.PKCS5UnPadding(decrypted);
    return cryptoJs.enc.Utf8.stringify(decryptedUnpadded);
};
const decryptWithAes = (type, data) => {
    const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
    let decryptValue = null;
    switch (type) {
        case 'AES_128_CBC':
            decryptValue = decrypt(alg_1.default.AES_128_CBC, key, data);
            break;
        case 'AES_192_CBC':
            decryptValue = decrypt(alg_1.default.AES_192_CBC, key, data);
            break;
        case 'AES_256_CBC':
            decryptValue = decrypt(alg_1.default.AES_256_CBC, key, data);
            break;
        case 'AES_128_GCM':
            decryptValue = decrypt(alg_1.default.AES_128_GCM, key, data);
            break;
        case 'AES_192_GCM':
            decryptValue = decrypt(alg_1.default.AES_192_GCM, key, data);
            break;
        case 'AES_256_GCM':
            decryptValue = decrypt(alg_1.default.AES_256_GCM, key, data);
        case 'AES_128_CCM':
            decryptValue = decrypt(alg_1.default.AES_128_CCM, key, data);
        case 'AES_192_CCM':
            decryptValue = decrypt(alg_1.default.AES_192_CCM, key, data);
            break;
        case 'AES_256_CCM':
            decryptValue = decrypt(alg_1.default.AES_256_CCM, key, data);
            break;
        case 'AES_128_OCB':
            decryptValue = decrypt(alg_1.default.AES_128_OCB, key, data);
            break;
        case 'AES_192_OCB':
            decryptValue = decrypt(alg_1.default.AES_192_OCB, key, data);
            break;
        case 'AES_256_OCB':
            decryptValue = decrypt(alg_1.default.AES_256_OCB, key, data);
            break;
        default:
            throw new Error('Unsupported decryption type');
    }
    return decryptValue;
};
exports.decryptWithAes = decryptWithAes;
/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
const encrypt = (alg, key, data) => {
    const metaAlg = getMetaFromAlgorithm(alg);
    if (key.length !== metaAlg.expectedKeyLen) {
        throw new Error(`invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
    }
    const keyHex = cryptoJs.enc.Hex.parse(key);
    const plainDataPadded = key_util_1.default.PKCS5Padding(data.toString());
    const iv = key_util_1.default.generateRandIV(16);
    const encrypted = cryptoJs.AES.encrypt(plainDataPadded, keyHex, {
        iv: iv,
        mode: cryptoJs.mode.CBC,
        padding: cryptoJs.pad.NoPadding,
    });
    const ivBuffer = key_util_1.default.wordArrayToBuffer(iv);
    const cipherBuffer = key_util_1.default.wordArrayToBuffer(encrypted.ciphertext);
    const cipherDataBytes = buffer_1.Buffer.concat([ivBuffer, cipherBuffer]);
    return cipherDataBytes;
};
const encryptWithAes = (type, data) => {
    const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
    let encryptedValue = null;
    switch (type) {
        case 'AES_128_CBC':
            encryptedValue = encrypt(alg_1.default.AES_128_CBC, key, data);
            break;
        case 'AES_192_CBC':
            encryptedValue = encrypt(alg_1.default.AES_192_CBC, key, data);
            break;
        case 'AES_256_CBC':
            encryptedValue = encrypt(alg_1.default.AES_256_CBC, key, data);
            break;
        case 'AES_128_GCM':
            encryptedValue = encrypt(alg_1.default.AES_128_GCM, key, data);
            break;
        case 'AES_192_GCM':
            encryptedValue = encrypt(alg_1.default.AES_192_GCM, key, data);
            break;
        case 'AES_256_GCM':
            encryptedValue = encrypt(alg_1.default.AES_256_GCM, key, data);
            break;
        case 'AES_128_CCM':
            encryptedValue = encrypt(alg_1.default.AES_128_CCM, key, data);
            break;
        case 'AES_192_CCM':
            encryptedValue = encrypt(alg_1.default.AES_192_CCM, key, data);
            break;
        case 'AES_256_CCM':
            encryptedValue = encrypt(alg_1.default.AES_256_CCM, key, data);
            break;
        case 'AES_128_OCB':
            encryptedValue = encrypt(alg_1.default.AES_128_OCB, key, data);
            break;
        case 'AES_192_OCB':
            encryptedValue = encrypt(alg_1.default.AES_192_OCB, key, data);
            break;
        case 'AES_256_OCB':
            encryptedValue = encrypt(alg_1.default.AES_256_OCB, key, data);
            break;
        default:
            throw new Error('Unsupported encryption type');
    }
    let cipher = new types_1.AesCipher();
    cipher.Value = encryptedValue;
    cipher.To = data.toString();
    return cipher;
};
exports.encryptWithAes = encryptWithAes;
