import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';

const DEFAULT_AUTH_TAG_LENGTH = 16;
const SUPPORTED_AUTH_TAG_MODES = ['gcm', 'ccm', 'ocb', 'chacha20-poly1305'];

dotenv.config();

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

  const cipher = createCipherivShim(alg, keyBuf, nonceBuf, cipherOptions);
  let encrypted = cipher.update(data.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // https://nodejs.org/api/crypto.html#ciphergetauthtag
  if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
    encrypted += Buffer.from(cipher.getAuthTag().toString('hex'));
  }

	const resultBuffer = Buffer.concat([nonceBuf, Buffer.from(encrypted, 'hex')], nonceBuf.length + Buffer.from(encrypted, 'hex').length);
	return resultBuffer;

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
const createCipherivShim = (
  algorithm: string,
  key: Buffer,
  iv: Buffer,
  options: any,
): any => {
  const cipher = createCipheriv(algorithm, key, iv, options);
  return cipher;
}

/**
 * Shim for difficult createCipheriv method
 * 
 * @param algorithm 
 * @param key 
 * @param iv 
 * @param options 
 * @returns 
 */
const createDecipherivShim = (
  algorithm: string,
  key: Buffer,
  iv: Buffer,
  options: any,
): any => {
  const cipher = createDecipheriv(algorithm, key, iv, options);
  return cipher;
}

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

  const buf = Buffer.from(data.toString(), 'hex');
  const nonceBuf = buf.subarray(0, metaAlg.ivLen);

  const decipher = createDecipherivShim(alg, keyBuf, nonceBuf, cipherOptions);

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

export const encryptWithAes = (type: string, data: string | Buffer) => {
	const key = process.env.CRYPTO_AES_KEY;
	switch (type) {
	  case 'AES_128_CBC':
		return encrypt(algorithms.AES_128_CBC, key, data);
	  case 'AES_192_CBC':
		return encrypt(algorithms.AES_192_CBC, key, data);
	  case 'AES_256_CBC':
		return encrypt(algorithms.AES_256_CBC, key, data);
	  case 'AES_128_GCM':
		return encrypt(algorithms.AES_128_GCM, key, data);
	  case 'AES_192_GCM':
		return encrypt(algorithms.AES_192_GCM, key, data);
	  case 'AES_256_GCM':
		return encrypt(algorithms.AES_256_GCM, key, data);
	  case 'AES_128_CCM':
		return encrypt(algorithms.AES_128_CCM, key, data);
	  case 'AES_192_CCM':
		return encrypt(algorithms.AES_192_CCM, key, data);
	  case 'AES_256_CCM':
		return encrypt(algorithms.AES_256_CCM, key, data);
	  case 'AES_128_OCB':
		return encrypt(algorithms.AES_128_OCB, key, data);
	  case 'AES_192_OCB':
		return encrypt(algorithms.AES_192_OCB, key, data);
	  case 'AES_256_OCB':
		return encrypt(algorithms.AES_256_OCB, key, data);
	  default:
		throw new Error('Unsupported encryption type');
	}
  };
  
  export const decryptWithAes = (type: string, data: string | Buffer) => {
	const key = process.env.CRYPTO_AES_KEY;
	switch (type) {
	  case 'AES_128_CBC':
		return decrypt(algorithms.AES_128_CBC, key, data);
	  case 'AES_192_CBC':
		return decrypt(algorithms.AES_192_CBC, key, data);
	  case 'AES_256_CBC':
		return decrypt(algorithms.AES_256_CBC, key, data);
	  case 'AES_128_GCM':
		return decrypt(algorithms.AES_128_GCM, key, data);
	  case 'AES_192_GCM':
		return decrypt(algorithms.AES_192_GCM, key, data);
	  case 'AES_256_GCM':
		return decrypt(algorithms.AES_256_GCM, key, data);
	  case 'AES_128_CCM':
		return decrypt(algorithms.AES_128_CCM, key, data);
	  case 'AES_192_CCM':
		return decrypt(algorithms.AES_192_CCM, key, data);
	  case 'AES_256_CCM':
		return decrypt(algorithms.AES_256_CCM, key, data);
	  case 'AES_128_OCB':
		return decrypt(algorithms.AES_128_OCB, key, data);
	  case 'AES_192_OCB':
		return decrypt(algorithms.AES_192_OCB, key, data);
	  case 'AES_256_OCB':
		return decrypt(algorithms.AES_256_OCB, key, data);
	  default:
		throw new Error('Unsupported decryption type');
	}
  };
