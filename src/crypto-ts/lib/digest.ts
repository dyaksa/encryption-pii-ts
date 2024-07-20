import { createHash } from 'crypto';
import alg from './alg';

/**
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @return {string}
 */
const digest = (algorithm: string, ...datas: (string | Buffer)[]): string => {
  const hash = createHash(algorithm);
  for (const data of datas) {
    hash.update(data);
  }

  return hash.digest('hex');
};

/**
 * @param datas {string | Buffer}
 * @return {string}
 */
export const md5 = (...datas: (string | Buffer)[]): string => digest(alg.MD5_DIGEST, ...datas);

/**
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha1 = (...datas: (string | Buffer)[]): string => digest(alg.SHA1_DIGEST, ...datas);

/**
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha256 = (...datas: (string | Buffer)[]): string => digest(alg.SHA256_DIGEST, ...datas);

/**
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha384 = (...datas: (string | Buffer)[]): string => digest(alg.SHA384_DIGEST, ...datas);

/**
 * @param datas {string | Buffer}
 * @return {string}
 */
export const sha512 = (...datas: (string | Buffer)[]): string => digest(alg.SHA512_DIGEST, ...datas);
