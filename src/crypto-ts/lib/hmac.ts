import { createHmac, KeyObject } from 'crypto';
import alg from './alg';
import keyUtil from './key_util';

/**
 * HMAC digest
 * @param algorithm {string}
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @returns {string}
 */
const digest = (algorithm: string, key: Buffer | KeyObject, datas: (string | Buffer)[]): string => {
  const hmac = createHmac(algorithm, key);
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
const commonGenerateDigest = (algorithm: string, key: Buffer | KeyObject, datas: (string | Buffer)[]): string => {
  keyUtil.checkKeyInput(key);

  return digest(algorithm, key, datas);
};

/**
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const md5 = (key: Buffer | KeyObject, ...datas: (string | Buffer)[]): string =>
  commonGenerateDigest(alg.MD5_DIGEST, key, datas);

/**
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha1 = (key: Buffer | KeyObject, ...datas: (string | Buffer)[]): string =>
  commonGenerateDigest(alg.SHA1_DIGEST, key, datas);

/**
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha256 = (key: Buffer | KeyObject, ...datas: (string | Buffer)[]): string =>
  commonGenerateDigest(alg.SHA256_DIGEST, key, datas);

/**
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha384 = (key: Buffer | KeyObject, ...datas: (string | Buffer)[]): string =>
  commonGenerateDigest(alg.SHA384_DIGEST, key, datas);

/**
 * @param key {Buffer | KeyObject}
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha512 = (key: Buffer | KeyObject, ...datas: (string | Buffer)[]): string =>
  commonGenerateDigest(alg.SHA512_DIGEST, key, datas);
