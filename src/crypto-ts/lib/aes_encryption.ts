import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';
import { AesCipher } from './types';
import * as cryptoJs from 'crypto-js';

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
const createDecipherivShim = (
	algorithm: string,
	key: Buffer,
	iv: Buffer,
	options: any,
): any => {
	const cipher = createDecipheriv(algorithm, key, iv, options);
	return cipher;
};

/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {Buffer}
 */
const decrypt = (alg: string, key: string, data: string | Buffer): string => {
	const encryptedBuffer =
		typeof data === 'string' ? Buffer.from(data, 'hex') : data;
	const keyHex = cryptoJs.enc.Hex.parse(key);
	const iv = encryptedBuffer.slice(0, 16);
	const cipherText = encryptedBuffer.slice(16);

	const ivWordArray = keyUtil.bufferToWordArray(iv);
	const ciphertextWordArray = keyUtil.bufferToWordArray(cipherText);

	const decrypted = cryptoJs.AES.decrypt(
		{ ciphertext: ciphertextWordArray } as any,
		keyHex,
		{
			iv: ivWordArray,
			mode: cryptoJs.mode.CBC,
			padding: cryptoJs.pad.NoPadding,
		},
	);

	const decryptedUnpadded = keyUtil.PKCS5UnPadding(decrypted);

	return cryptoJs.enc.Utf8.stringify(decryptedUnpadded);
};

export const decryptWithAes = (type: string, data: string | Buffer): string => {
	const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
	let decryptValue: string = null;
	switch (type) {
		case 'AES_128_CBC':
			decryptValue = decrypt(algorithms.AES_128_CBC, key, data);
			break;
		case 'AES_192_CBC':
			decryptValue = decrypt(algorithms.AES_192_CBC, key, data);
			break;
		case 'AES_256_CBC':
			decryptValue = decrypt(algorithms.AES_256_CBC, key, data);
			break;
		case 'AES_128_GCM':
			decryptValue = decrypt(algorithms.AES_128_GCM, key, data);
			break;
		case 'AES_192_GCM':
			decryptValue = decrypt(algorithms.AES_192_GCM, key, data);
			break;
		case 'AES_256_GCM':
			decryptValue = decrypt(algorithms.AES_256_GCM, key, data);
		case 'AES_128_CCM':
			decryptValue = decrypt(algorithms.AES_128_CCM, key, data);
		case 'AES_192_CCM':
			decryptValue = decrypt(algorithms.AES_192_CCM, key, data);
			break;
		case 'AES_256_CCM':
			decryptValue = decrypt(algorithms.AES_256_CCM, key, data);
			break;
		case 'AES_128_OCB':
			decryptValue = decrypt(algorithms.AES_128_OCB, key, data);
			break;
		case 'AES_192_OCB':
			decryptValue = decrypt(algorithms.AES_192_OCB, key, data);
			break;
		case 'AES_256_OCB':
			decryptValue = decrypt(algorithms.AES_256_OCB, key, data);
			break;
		default:
			throw new Error('Unsupported decryption type');
	}

	return decryptValue;
};

/**
 * @param alg {string}
 * @param key {string}
 * @param data {string | Buffer}
 * @return {{encrypted: string, nonce}}
 */
const encrypt = (alg: string, key: string, data: string | Buffer): Buffer => {
	const metaAlg = getMetaFromAlgorithm(alg);
	if (key.length !== metaAlg.expectedKeyLen) {
		throw new Error(
			`invalid key length, key length should be ${metaAlg.expectedKeyLen}`,
		);
	}

	const keyHex = cryptoJs.enc.Hex.parse(key);
	const plainDataPadded = keyUtil.PKCS5Padding(data.toString());
	const iv = keyUtil.generateRandIV(16);

	const encrypted = cryptoJs.AES.encrypt(plainDataPadded, keyHex, {
		iv: iv,
		mode: cryptoJs.mode.CBC,
		padding: cryptoJs.pad.NoPadding,
	});

	const ivBuffer = keyUtil.wordArrayToBuffer(iv);
	const cipherBuffer = keyUtil.wordArrayToBuffer(encrypted.ciphertext);

	const cipherDataBytes = Buffer.concat([ivBuffer, cipherBuffer]);

	return cipherDataBytes;
};

export const encryptWithAes = (type: string, data: string | Buffer): any => {
	const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
	let encryptedValue: Buffer = null;
	switch (type) {
		case 'AES_128_CBC':
			encryptedValue = encrypt(algorithms.AES_128_CBC, key, data);
			break;
		case 'AES_192_CBC':
			encryptedValue = encrypt(algorithms.AES_192_CBC, key, data);
			break;
		case 'AES_256_CBC':
			encryptedValue = encrypt(algorithms.AES_256_CBC, key, data);
			break;
		case 'AES_128_GCM':
			encryptedValue = encrypt(algorithms.AES_128_GCM, key, data);
			break;
		case 'AES_192_GCM':
			encryptedValue = encrypt(algorithms.AES_192_GCM, key, data);
			break;
		case 'AES_256_GCM':
			encryptedValue = encrypt(algorithms.AES_256_GCM, key, data);
			break;
		case 'AES_128_CCM':
			encryptedValue = encrypt(algorithms.AES_128_CCM, key, data);
			break;
		case 'AES_192_CCM':
			encryptedValue = encrypt(algorithms.AES_192_CCM, key, data);
			break;
		case 'AES_256_CCM':
			encryptedValue = encrypt(algorithms.AES_256_CCM, key, data);
			break;
		case 'AES_128_OCB':
			encryptedValue = encrypt(algorithms.AES_128_OCB, key, data);
			break;
		case 'AES_192_OCB':
			encryptedValue = encrypt(algorithms.AES_192_OCB, key, data);
			break;
		case 'AES_256_OCB':
			encryptedValue = encrypt(algorithms.AES_256_OCB, key, data);
			break;
		default:
			throw new Error('Unsupported encryption type');
	}

	let cipher = new AesCipher();
	cipher.Value = encryptedValue;
	cipher.To = data.toString();

	return cipher;
};
