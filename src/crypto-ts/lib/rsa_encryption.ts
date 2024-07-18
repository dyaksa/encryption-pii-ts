import { publicEncrypt, privateDecrypt, constants, KeyObject } from 'crypto';
import alg from './alg';
import { checkBuffer } from './common';

/**
 * @param fnEncryptDecrypt {function}
 * @param key {Buffer | KeyObject}
 * @param digest {string}
 * @param data {string | Buffer}
 * @return {Buffer | Error}
 */
const commonEncryptDecrypt = (
  fnEncryptDecrypt: (options: any, data: Buffer | string) => Buffer,
  key: Buffer | KeyObject,
  digest: string,
  data: Buffer | string
): Buffer | Error => {
  checkBuffer(data);
  const options = {
    key,
    oaepHash: digest,
    padding: constants.RSA_PKCS1_OAEP_PADDING,
  };
  return fnEncryptDecrypt(options, data);
};

/**
 * RSA Encryption
 * @param publicKey {Buffer | KeyObject}
 * @param digest {string}
 * @param data {Buffer}
 * @returns {Buffer | Error}
 */
const encrypt = (
  publicKey: Buffer | KeyObject,
  digest: string,
  data: Buffer
): Buffer | Error => commonEncryptDecrypt(
  publicEncrypt,
  publicKey,
  digest,
  data,
);

/**
 * @param publicKey {Buffer | KeyObject}
 * @param data {Buffer}
 * @returns {Buffer}
 */
export const encryptWithOaepMd5 = (
  publicKey: Buffer | KeyObject,
  data: Buffer
): Buffer => encrypt(
  publicKey,
  alg.MD5_DIGEST,
  data,
);

/**
 * @param publicKey {Buffer | KeyObject}
 * @param data {Buffer}
 * @returns {Buffer}
 */
export const encryptWithOaepSha1 = (
  publicKey: Buffer | KeyObject,
  data: Buffer
): Buffer => encrypt(
  publicKey,
  alg.SHA1_DIGEST,
  data,
);

/**
 * @param publicKey {Buffer | KeyObject}
 * @param data {Buffer}
 * @returns {Buffer}
 */
export const encryptWithOaepSha256 = (
  publicKey: Buffer | KeyObject,
  data: Buffer
): Buffer => encrypt(
  publicKey,
  alg.SHA256_DIGEST,
  data,
);

/**
 * @param publicKey {Buffer | KeyObject}
 * @param data {Buffer}
 * @returns {Buffer}
 */
export const encryptWithOaepSha384 = (
  publicKey: Buffer | KeyObject,
  data: Buffer
): Buffer => encrypt(
  publicKey,
  alg.SHA384_DIGEST,
  data,
);

/**
 * @param publicKey {Buffer | KeyObject}
 * @param data {Buffer}
 * @returns {Buffer}
 */
export const encryptWithOaepSha512 = (
  publicKey: Buffer | KeyObject,
  data: Buffer
): Buffer => encrypt(
  publicKey,
  alg.SHA512_DIGEST,
  data,
);

/**
 * RSA Decryption
 * @param privateKey {Buffer | KeyObject}
 * @param digest {string}
 * @param data {string | Buffer}
 * @returns {Buffer | Error}
 */
const decrypt = (
  privateKey: Buffer | KeyObject,
  digest: string,
  data: string | Buffer
): Buffer | Error => commonEncryptDecrypt(
  privateDecrypt,
  privateKey,
  digest,
  data,
);

/**
 * @param privateKey {Buffer | KeyObject}
 * @param encryptedData {Buffer}
 * @returns {Buffer}
 */
export const decryptWithOaepMd5 = (
  privateKey: Buffer | KeyObject,
  encryptedData: Buffer
): Buffer => decrypt(
  privateKey,
  alg.MD5_DIGEST,
  encryptedData,
);

/**
 * @param privateKey {Buffer | KeyObject}
 * @param encryptedData {Buffer}
 * @returns {Buffer}
 */
export const decryptWithOaepSha1 = (
  privateKey: Buffer | KeyObject,
  encryptedData: Buffer
): Buffer => decrypt(
  privateKey,
  alg.SHA1_DIGEST,
  encryptedData,
);

/**
 * @param privateKey {Buffer | KeyObject}
 * @param encryptedData {Buffer}
 * @returns {Buffer}
 */
export const decryptWithOaepSha256 = (
  privateKey: Buffer | KeyObject,
  encryptedData: Buffer
): Buffer => decrypt(
  privateKey,
  alg.SHA256_DIGEST,
  encryptedData,
);

/**
 * @param privateKey {Buffer | KeyObject}
 * @param encryptedData {Buffer}
 * @returns {Buffer}
 */
export const decryptWithOaepSha384 = (
  privateKey: Buffer | KeyObject,
  encryptedData: Buffer
): Buffer => decrypt(
  privateKey,
  alg.SHA384_DIGEST,
  encryptedData,
);

/**
 * @param privateKey {Buffer | KeyObject}
 * @param encryptedData {Buffer}
 * @returns {Buffer}
 */
export const decryptWithOaepSha512 = (
  privateKey: Buffer | KeyObject,
  encryptedData: Buffer
): Buffer => decrypt(
  privateKey,
  alg.SHA512_DIGEST,
  encryptedData,
);
