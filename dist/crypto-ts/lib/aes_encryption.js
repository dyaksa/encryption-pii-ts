"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptWithAes = exports.decryptWithAes = void 0;
const crypto_1 = require("crypto");
const buffer_1 = require("buffer");
const alg_1 = require("./alg");
const dotenv = require("dotenv");
const types_1 = require("./types");
const child_process_1 = require("child_process");
const path = require("path");
const util_1 = require("util");
const execFilePromise = (0, util_1.promisify)(child_process_1.execFile);
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
const decrypt = (alg, key, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure data is a valid type
    if (typeof data !== 'object' && typeof data !== 'string') {
        throw new Error('Error: data param should be an object or string');
    }
    const metaAlg = getMetaFromAlgorithm(alg);
    // Validate key length
    if (key.length !== metaAlg.expectedKeyLen) {
        throw new Error(`Invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
    }
    try {
        const binaryPath = path.resolve(__dirname, 'bin', 'decrypt', 'decryptor');
        const keyBuf = buffer_1.Buffer.from(key);
        const encryptedData = buffer_1.Buffer.from(data.toString());
        const algorithm = 0;
        const args = [
            '-alg',
            algorithm.toString(),
            '-key',
            keyBuf.toString('hex'),
            '-data',
            encryptedData.toString('hex'),
        ];
        const { stdout, stderr } = yield execFilePromise(binaryPath, args);
        if (stderr) {
            throw new Error(stderr);
        }
        const decryptedData = buffer_1.Buffer.from(stdout.trim(), 'hex');
        return decryptedData.toString();
    }
    catch (err) {
        throw new Error(err);
    }
});
const decryptWithAes = (type, data) => __awaiter(void 0, void 0, void 0, function* () {
    const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
    let decryptValue = null;
    switch (type) {
        case 'AES_128_CBC':
            decryptValue = yield decrypt(alg_1.default.AES_128_CBC, key, data);
            break;
        case 'AES_192_CBC':
            decryptValue = yield decrypt(alg_1.default.AES_192_CBC, key, data);
            break;
        case 'AES_256_CBC':
            decryptValue = yield decrypt(alg_1.default.AES_256_CBC, key, data);
            break;
        case 'AES_128_GCM':
            decryptValue = yield decrypt(alg_1.default.AES_128_GCM, key, data);
            break;
        case 'AES_192_GCM':
            decryptValue = yield decrypt(alg_1.default.AES_192_GCM, key, data);
            break;
        case 'AES_256_GCM':
            decryptValue = yield decrypt(alg_1.default.AES_256_GCM, key, data);
        case 'AES_128_CCM':
            decryptValue = yield decrypt(alg_1.default.AES_128_CCM, key, data);
        case 'AES_192_CCM':
            decryptValue = yield decrypt(alg_1.default.AES_192_CCM, key, data);
            break;
        case 'AES_256_CCM':
            decryptValue = yield decrypt(alg_1.default.AES_256_CCM, key, data);
            break;
        case 'AES_128_OCB':
            decryptValue = yield decrypt(alg_1.default.AES_128_OCB, key, data);
            break;
        case 'AES_192_OCB':
            decryptValue = yield decrypt(alg_1.default.AES_192_OCB, key, data);
            break;
        case 'AES_256_OCB':
            decryptValue = yield decrypt(alg_1.default.AES_256_OCB, key, data);
            break;
        default:
            throw new Error('Unsupported decryption type');
    }
    return decryptValue;
});
exports.decryptWithAes = decryptWithAes;
/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
const encrypt = (alg, key, data) => __awaiter(void 0, void 0, void 0, function* () {
    const metaAlg = getMetaFromAlgorithm(alg);
    if (key.length !== metaAlg.expectedKeyLen) {
        throw new Error(`invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
    }
    const binaryPath = path.resolve(__dirname, 'bin', 'encrypt', 'encryptor');
    const keyBuf = buffer_1.Buffer.from(key);
    const plainData = buffer_1.Buffer.from(data.toString());
    let algorithm = 0;
    switch (metaAlg.mode) {
        case 'cbc':
            algorithm = 0;
            break;
        case 'gcm':
            algorithm = 2;
            break;
        case 'ocb':
            algorithm = 1;
            break;
    }
    const args = [
        '-alg',
        algorithm.toString(),
        '-key',
        keyBuf.toString('hex'),
        '-data',
        plainData.toString('hex'),
    ];
    try {
        const { stdout, stderr } = yield execFilePromise(binaryPath, args);
        if (stderr) {
            throw new Error(stderr);
        }
        return buffer_1.Buffer.from(stdout.trim(), 'hex');
    }
    catch (err) {
        throw new Error(err);
    }
});
const encryptWithAes = (type, data) => __awaiter(void 0, void 0, void 0, function* () {
    const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
    let encryptedValue = null;
    switch (type) {
        case 'AES_128_CBC':
            encryptedValue = yield encrypt(alg_1.default.AES_128_CBC, key, data);
            break;
        case 'AES_192_CBC':
            encryptedValue = yield encrypt(alg_1.default.AES_192_CBC, key, data);
            break;
        case 'AES_256_CBC':
            encryptedValue = yield encrypt(alg_1.default.AES_256_CBC, key, data);
            break;
        case 'AES_128_GCM':
            encryptedValue = yield encrypt(alg_1.default.AES_128_GCM, key, data);
            break;
        case 'AES_192_GCM':
            encryptedValue = yield encrypt(alg_1.default.AES_192_GCM, key, data);
            break;
        case 'AES_256_GCM':
            encryptedValue = yield encrypt(alg_1.default.AES_256_GCM, key, data);
            break;
        case 'AES_128_CCM':
            encryptedValue = yield encrypt(alg_1.default.AES_128_CCM, key, data);
            break;
        case 'AES_192_CCM':
            encryptedValue = yield encrypt(alg_1.default.AES_192_CCM, key, data);
            break;
        case 'AES_256_CCM':
            encryptedValue = yield encrypt(alg_1.default.AES_256_CCM, key, data);
            break;
        case 'AES_128_OCB':
            encryptedValue = yield encrypt(alg_1.default.AES_128_OCB, key, data);
            break;
        case 'AES_192_OCB':
            encryptedValue = yield encrypt(alg_1.default.AES_192_OCB, key, data);
            break;
        case 'AES_256_OCB':
            encryptedValue = yield encrypt(alg_1.default.AES_256_OCB, key, data);
            break;
        default:
            throw new Error('Unsupported encryption type');
    }
    let cipher = new types_1.AesCipher();
    cipher.Value = encryptedValue;
    cipher.To = data.toString();
    return cipher;
});
exports.encryptWithAes = encryptWithAes;
