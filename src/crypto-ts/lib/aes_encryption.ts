import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';

const DEFAULT_AUTH_TAG_LENGTH = 16;
const SUPPORTED_AUTH_TAG_MODES = ['gcm', 'ccm', 'ocb', 'chacha20-poly1305'];

interface AlgorithmMeta {
  mode: string;
  ivLen: number;
  expectedKeyLen: number;
}

/**
 * @param alg {string}
 * @return {{mode: *, ivLen: (number), expectedKeyLen: number}}
 */
const getMetaFromAlgorithm = (alg: string): AlgorithmMeta => {
  const algSplited = alg.split('-');
  if (algSplited.length < 3) {
    throw new Error('invalid aes algorithm');
  }

  const keyLenInt = parseInt(algSplited[1], 10);
  const ivLen = algSplited[2] === 'cbc' ? 16 : 12;
  return { expectedKeyLen: keyLenInt / 8, mode: algSplited[2], ivLen };
};

/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
const encrypt = (alg: string, key: string, data: string | Buffer) => {
  const metaAlg = getMetaFromAlgorithm(alg);
  if (key.length !== metaAlg.expectedKeyLen) {
    throw new Error(`invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
  }

  const nonce = keyUtil.generateRandomIV(metaAlg.ivLen);
  const nonceBuf = Buffer.from(nonce, 'hex');

  const keyBuf = Buffer.from(key);

  const cipherOptions = {
    authTagLength: DEFAULT_AUTH_TAG_LENGTH,
  };

  const cipher = createCipheriv(alg, keyBuf, nonceBuf, cipherOptions);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // https://nodejs.org/api/crypto.html#ciphergetauthtag
  if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
    encrypted += Buffer.from(cipher.getAuthTag().toString('hex'));
  }

  return Buffer.concat([nonceBuf, Buffer.from(encrypted, 'hex')], nonceBuf.length + Buffer.from(encrypted, 'hex').length);
};

/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
const decrypt = (alg: string, key: string, data: string | Buffer) => {
  if (typeof data !== 'object' && typeof data !== 'string') {
    throw new Error('error: data param should be object');
  }

  const metaAlg = getMetaFromAlgorithm(alg);
  if (key.length !== metaAlg.expectedKeyLen) {
    throw new Error(`invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
  }

  const keyBuf = Buffer.from(key);

  const cipherOptions = {
    authTagLength: DEFAULT_AUTH_TAG_LENGTH,
  };

  const buf = Buffer.from(data, 'hex');
  const nonceBuf = buf.subarray(0, metaAlg.ivLen);

  const decipher = createDecipheriv(alg, keyBuf, nonceBuf, cipherOptions);

  let encryptedBuf;
  // https://nodejs.org/api/crypto.html#deciphersetauthtag
  if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
    const sFrom = buf.length - DEFAULT_AUTH_TAG_LENGTH;
    const authTagUtf8 = buf.subarray(sFrom, buf.length);
    decipher.setAuthTag(authTagUtf8);
    encryptedBuf = buf.subarray(metaAlg.ivLen, sFrom);
  } else {
    encryptedBuf = buf.subarray(metaAlg.ivLen, buf.length);
  }

  let decrypted = decipher.update(encryptedBuf);
  let remaining = decipher.final();
  return Buffer.concat([decrypted, remaining], decrypted.length + remaining.length);
};

// CBC
/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes128Cbc = (key: string, data: string | Buffer) => encrypt(algorithms.AES_128_CBC, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes192Cbc = (key: string, data: string | Buffer) => encrypt(algorithms.AES_192_CBC, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes256Cbc = (key: string, data: string | Buffer) => encrypt(algorithms.AES_256_CBC, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes128Cbc = (key: string, data: string | Buffer) => decrypt(algorithms.AES_128_CBC, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes192Cbc = (key: string, data: string | Buffer) => decrypt(algorithms.AES_192_CBC, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes256Cbc = (key: string, data: string | Buffer) => decrypt(algorithms.AES_256_CBC, key, data);

// GCM
/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes128Gcm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_128_GCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes192Gcm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_192_GCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes256Gcm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_256_GCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes128Gcm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_128_GCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes192Gcm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_192_GCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes256Gcm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_256_GCM, key, data);

// CCM
/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes128Ccm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_128_CCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes192Ccm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_192_CCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes256Ccm = (key: string, data: string | Buffer) => encrypt(algorithms.AES_256_CCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes128Ccm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_128_CCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes192Ccm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_192_CCM, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes256Ccm = (key: string, data: string | Buffer) => decrypt(algorithms.AES_256_CCM, key, data);

// OCB
/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes128Ocb = (key: string, data: string | Buffer) => encrypt(algorithms.AES_128_OCB, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes192Ocb = (key: string, data: string | Buffer) => encrypt(algorithms.AES_192_OCB, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
export const encryptWithAes256Ocb = (key: string, data: string | Buffer) => encrypt(algorithms.AES_256_OCB, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes128Ocb = (key: string, data: string | Buffer) => decrypt(algorithms.AES_128_OCB, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes192Ocb = (key: string, data: string | Buffer) => decrypt(algorithms.AES_192_OCB, key, data);

/**
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
export const decryptWithAes256Ocb = (key: string, data: string | Buffer) => decrypt(algorithms.AES_256_OCB, key, data);
