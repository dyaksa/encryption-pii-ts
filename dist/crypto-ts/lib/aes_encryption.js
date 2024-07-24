"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptWithAes = exports.decryptWithAes = void 0;
const crypto_1 = require("crypto");
const buffer_1 = require("buffer");
const alg_1 = require("./alg");
const key_util_1 = require("./key_util");
const dotenv = require("dotenv");
const types_1 = require("./types");
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
    // Ensure data is a valid type
    if (typeof data !== 'object' && typeof data !== 'string') {
        throw new Error('Error: data param should be an object or string');
    }
    const metaAlg = getMetaFromAlgorithm(alg);
    // Validate key length
    if (key.length !== metaAlg.expectedKeyLen) {
        throw new Error(`Invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
    }
    const keyBuf = buffer_1.Buffer.from(key);
    const cipherOptions = {
        authTagLength: DEFAULT_AUTH_TAG_LENGTH,
    };
    // Convert data to a buffer
    const buf = buffer_1.Buffer.from(data.toString('hex'), 'hex');
    const nonceBuf = buf.subarray(0, metaAlg.ivLen);
    // Create decipher instance
    const decipher = createDecipherivShim(alg, keyBuf, nonceBuf, cipherOptions);
    let encryptedBuf;
    // Handle authentication tag if necessary
    if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
        const sFrom = buf.length - DEFAULT_AUTH_TAG_LENGTH;
        const authTagUtf8 = buf.subarray(sFrom, buf.length);
        decipher.setAuthTag(authTagUtf8);
        encryptedBuf = buf.subarray(metaAlg.ivLen, sFrom);
    }
    else {
        encryptedBuf = buf.subarray(metaAlg.ivLen, buf.length);
    }
    // Perform decryption
    let decrypted = decipher.update(encryptedBuf);
    let remaining = decipher.final();
    // Concatenate decrypted buffers
    const resultBuffer = buffer_1.Buffer.concat([decrypted, remaining], decrypted.length + remaining.length);
    return resultBuffer.toString();
};
const decryptWithAes = (type, data) => {
    const key = process.env.CRYPTO_AES_KEY;
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
    const nonce = key_util_1.default.generateRandomIV(metaAlg.ivLen);
    const nonceBuf = buffer_1.Buffer.from(nonce, 'hex');
    const keyBuf = buffer_1.Buffer.from(key);
    const cipherOptions = {
        authTagLength: DEFAULT_AUTH_TAG_LENGTH,
    };
    const cipher = createCipherivShim(alg, keyBuf, nonceBuf, cipherOptions);
    let encrypted = cipher.update(data.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // https://nodejs.org/api/crypto.html#ciphergetauthtag
    if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
        encrypted += buffer_1.Buffer.from(cipher.getAuthTag().toString('hex'));
    }
    const resultBuffer = buffer_1.Buffer.concat([nonceBuf, buffer_1.Buffer.from(encrypted, 'hex')], nonceBuf.length + buffer_1.Buffer.from(encrypted, 'hex').length);
    return resultBuffer;
};
const encryptWithAes = (type, data) => {
    const key = process.env.CRYPTO_AES_KEY;
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
