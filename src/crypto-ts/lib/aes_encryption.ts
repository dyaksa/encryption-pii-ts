import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';
import { AesCipher } from './types';
import { Console } from 'console';

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
	// Ensure data is a valid type
	if (typeof data !== 'object' && typeof data !== 'string') {
		throw new Error('Error: data param should be an object or string');
	}

	const metaAlg = getMetaFromAlgorithm(alg);

	// Validate key length
	if (key.length !== metaAlg.expectedKeyLen) {
		throw new Error(
			`Invalid key length, key length should be ${metaAlg.expectedKeyLen}`,
		);
	}

	const keyBuf = Buffer.from(key);

	const decodedBuffer = Buffer.from(data.toString('hex'));
	const decodedLen = decodedBuffer.length / 2;
	const encryptedDataOut = new Uint8Array(decodedLen);
	let encryptedDataOutN = 0;

	for (let i = 0; i < decodedBuffer.length; i += 2) {
		encryptedDataOut[i / 2] = parseInt(
			data.toString('hex').substr(i, 2),
			16,
		);
	}
	encryptedDataOutN = encryptedDataOut.length;

	if (encryptedDataOut.length < 16) {
		throw new Error('Invalid encrypted data');
	}

	const cipherDataBytes = encryptedDataOut.slice(16, encryptedDataOutN);

	if (cipherDataBytes.length % 16 !== 0) {
		throw new Error('Invalid encrypted data');
	}

	const nonceBytes = encryptedDataOut.slice(0, 16);
	console.log('Key:', keyBuf);
	console.log('IV:', nonceBytes);
	console.log('Cipher Data Bytes:', cipherDataBytes);

	const decipher = createDecipheriv('aes-256-cbc', keyBuf, nonceBytes);

	const decryptedData = Buffer.concat([
		decipher.update(Buffer.from(cipherDataBytes)),
		decipher.final(),
	]);

	console.log(decryptedData);

	// const decryptedData = Buffer.concat([
	// 	decipher.update(Buffer.from(cipherDataBytes)),
	// 	decipher.final(),
	// ]);

	// console.log(decryptedData);

	// const buff = keyUtil.pkcs5UnPadding(decryptedData);

	// console.log(buff);

	return '';

	// const cipherOptions = {
	// 	authTagLength: DEFAULT_AUTH_TAG_LENGTH,
	// };

	// // Convert data to a buffer
	// const buf = Buffer.from(data.toString('hex'), 'hex');
	// const nonceBuf = buf.subarray(0, metaAlg.ivLen);

	// // Create decipher instance
	// const decipher = createDecipherivShim(alg, keyBuf, nonceBuf, cipherOptions);

	// let encryptedBuf;

	// // Handle authentication tag if necessary
	// if (SUPPORTED_AUTH_TAG_MODES.includes(metaAlg.mode)) {
	// 	const sFrom = buf.length - DEFAULT_AUTH_TAG_LENGTH;
	// 	const authTagUtf8 = buf.subarray(sFrom, buf.length);
	// 	decipher.setAuthTag(authTagUtf8);
	// 	encryptedBuf = buf.subarray(metaAlg.ivLen, sFrom);
	// } else {
	// 	encryptedBuf = buf.subarray(metaAlg.ivLen, buf.length);
	// }

	// // Perform decryption
	// let decrypted = decipher.update(encryptedBuf);
	// let remaining = decipher.final();

	// // Concatenate decrypted buffers
	// const resultBuffer = Buffer.concat(
	// 	[decrypted, remaining],
	// 	decrypted.length + remaining.length,
	// );
	// return resultBuffer.toString();
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

	const plainDataPadded = keyUtil.pkcs5Padding(Buffer.from(data));

	const cipherDataBytes = new Uint8Array(plainDataPadded.length + 16);

	keyUtil.generateRandIV(cipherDataBytes.subarray(0, 16));

	const keyB = Buffer.from(key);

	const cipher = createCipheriv(
		'aes-256-cbc',
		keyB,
		cipherDataBytes.subarray(0, 16),
	);

	const encrypted = Buffer.concat([
		cipher.update(plainDataPadded),
		cipher.final(),
	]);

	encrypted.copy(cipherDataBytes, 16);

	return encrypted;
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
