"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonGenerateDigest = void 0;
const crypto_1 = require("crypto");
const alg_1 = require("./alg");
const key_util_1 = require("./key_util");
/**
 * HMAC digest
 * @param algorithm {string}
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @returns {string}
 */
const digest = (algorithm, key, datas) => {
    const hmac = (0, crypto_1.createHmac)(algorithm, key);
    for (const data of datas) {
        hmac.update(data.toString());
    }
    return hmac.digest('hex');
};
/**
 *
 * @param algorithm {string}
 * @param key {string | Buffer}
 * @param datas {string | Buffer}
 * @return {string}
 */
const commonGenerateDigest = (algorithm, key, ...datas) => {
    key_util_1.default.checkKeyInput(key);
    switch (algorithm.toUpperCase()) {
        case 'MD5':
            return digest(alg_1.default.MD5_DIGEST, key, datas);
        case 'SHA1':
            return digest(alg_1.default.SHA1_DIGEST, key, datas);
        case 'SHA256':
            return digest(alg_1.default.SHA256_DIGEST, key, datas);
        case 'SHA384':
            return digest(alg_1.default.SHA384_DIGEST, key, datas);
        case 'SHA512':
            return digest(alg_1.default.SHA512_DIGEST, key, datas);
        default:
            throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
};
exports.commonGenerateDigest = commonGenerateDigest;
