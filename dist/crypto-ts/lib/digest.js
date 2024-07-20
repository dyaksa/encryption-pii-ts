"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha512 = exports.sha384 = exports.sha256 = exports.sha1 = exports.md5 = void 0;
const crypto_1 = require("crypto");
const alg_1 = require("./alg");
/**
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @return {string}
 */
const digest = (algorithm, ...datas) => {
    const hash = (0, crypto_1.createHash)(algorithm);
    for (const data of datas) {
        hash.update(data);
    }
    return hash.digest('hex');
};
/**
 * @param datas {string | Buffer}
 * @return {string}
 */
const md5 = (...datas) => digest(alg_1.default.MD5_DIGEST, ...datas);
exports.md5 = md5;
/**
 * @param datas {string | Buffer}
 * @return {string}
 */
const sha1 = (...datas) => digest(alg_1.default.SHA1_DIGEST, ...datas);
exports.sha1 = sha1;
/**
 * @param datas {string | Buffer}
 * @return {string}
 */
const sha256 = (...datas) => digest(alg_1.default.SHA256_DIGEST, ...datas);
exports.sha256 = sha256;
/**
 * @param datas {string | Buffer}
 * @return {string}
 */
const sha384 = (...datas) => digest(alg_1.default.SHA384_DIGEST, ...datas);
exports.sha384 = sha384;
/**
 * @param datas {string | Buffer}
 * @return {string}
 */
const sha512 = (...datas) => digest(alg_1.default.SHA512_DIGEST, ...datas);
exports.sha512 = sha512;
