import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';
import { AesCipher } from './types';
import * as cryptoJs from 'crypto-js';
import { execFile } from 'child_process';
import path = require('path');
import { promisify } from 'util';

const execFilePromise = promisify(execFile);

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
const decrypt = async (
	alg: string,
	key: string,
	data: string | Buffer,
): Promise<string> => {
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

	try {
		const binaryPath = path.resolve(
			__dirname,
			'bin',
			'decrypt',
			'decryptor',
		);

		const keyBuf = Buffer.from(key);
		const encryptedData = Buffer.from(data.toString());
		const algorithm = 0;

		const args = [
			'-alg',
			algorithm.toString(),
			'-key',
			keyBuf.toString('hex'),
			'-data',
			encryptedData.toString('hex'),
		];

		const { stdout, stderr } = await execFilePromise(binaryPath, args);

		if (stderr) {
			throw new Error(stderr);
		}

		const decryptedData = Buffer.from(stdout.trim(), 'hex');
		return decryptedData.toString();
	} catch (err) {
		throw new Error(err);
	}
};

export const decryptWithAes = async (
	type: string,
	data: string | Buffer,
): Promise<string> => {
	const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
	let decryptValue: string = null;
	switch (type) {
		case 'AES_128_CBC':
			decryptValue = await decrypt(algorithms.AES_128_CBC, key, data);
			break;
		case 'AES_192_CBC':
			decryptValue = await decrypt(algorithms.AES_192_CBC, key, data);
			break;
		case 'AES_256_CBC':
			decryptValue = await decrypt(algorithms.AES_256_CBC, key, data);
			break;
		case 'AES_128_GCM':
			decryptValue = await decrypt(algorithms.AES_128_GCM, key, data);
			break;
		case 'AES_192_GCM':
			decryptValue = await decrypt(algorithms.AES_192_GCM, key, data);
			break;
		case 'AES_256_GCM':
			decryptValue = await decrypt(algorithms.AES_256_GCM, key, data);
		case 'AES_128_CCM':
			decryptValue = await decrypt(algorithms.AES_128_CCM, key, data);
		case 'AES_192_CCM':
			decryptValue = await decrypt(algorithms.AES_192_CCM, key, data);
			break;
		case 'AES_256_CCM':
			decryptValue = await decrypt(algorithms.AES_256_CCM, key, data);
			break;
		case 'AES_128_OCB':
			decryptValue = await decrypt(algorithms.AES_128_OCB, key, data);
			break;
		case 'AES_192_OCB':
			decryptValue = await decrypt(algorithms.AES_192_OCB, key, data);
			break;
		case 'AES_256_OCB':
			decryptValue = await decrypt(algorithms.AES_256_OCB, key, data);
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
const encrypt = async (
	alg: string,
	key: string,
	data: string | Buffer,
): Promise<Buffer> => {
	const metaAlg = getMetaFromAlgorithm(alg);
	if (key.length !== metaAlg.expectedKeyLen) {
		throw new Error(
			`invalid key length, key length should be ${metaAlg.expectedKeyLen}`,
		);
	}

	const binaryPath = path.resolve(__dirname, 'bin', 'encrypt', 'encryptor');

	const keyBuf = Buffer.from(key);
	const plainData = Buffer.from(data.toString());
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
		const { stdout, stderr } = await execFilePromise(binaryPath, args);

		if (stderr) {
			throw new Error(stderr);
		}

		return Buffer.from(stdout.trim(), 'hex');
	} catch (err) {
		throw new Error(err);
	}
};

export const encryptWithAes = async (
	type: string,
	data: string | Buffer,
): Promise<any> => {
	const key = 'dGtmY2hrc3Fodm5seGZ5bWRzdXphdmJr';
	let encryptedValue: Buffer = null;
	switch (type) {
		case 'AES_128_CBC':
			encryptedValue = await encrypt(algorithms.AES_128_CBC, key, data);
			break;
		case 'AES_192_CBC':
			encryptedValue = await encrypt(algorithms.AES_192_CBC, key, data);
			break;
		case 'AES_256_CBC':
			encryptedValue = await encrypt(algorithms.AES_256_CBC, key, data);
			break;
		case 'AES_128_GCM':
			encryptedValue = await encrypt(algorithms.AES_128_GCM, key, data);
			break;
		case 'AES_192_GCM':
			encryptedValue = await encrypt(algorithms.AES_192_GCM, key, data);
			break;
		case 'AES_256_GCM':
			encryptedValue = await encrypt(algorithms.AES_256_GCM, key, data);
			break;
		case 'AES_128_CCM':
			encryptedValue = await encrypt(algorithms.AES_128_CCM, key, data);
			break;
		case 'AES_192_CCM':
			encryptedValue = await encrypt(algorithms.AES_192_CCM, key, data);
			break;
		case 'AES_256_CCM':
			encryptedValue = await encrypt(algorithms.AES_256_CCM, key, data);
			break;
		case 'AES_128_OCB':
			encryptedValue = await encrypt(algorithms.AES_128_OCB, key, data);
			break;
		case 'AES_192_OCB':
			encryptedValue = await encrypt(algorithms.AES_192_OCB, key, data);
			break;
		case 'AES_256_OCB':
			encryptedValue = await encrypt(algorithms.AES_256_OCB, key, data);
			break;
		default:
			throw new Error('Unsupported encryption type');
	}

	let cipher = new AesCipher();
	cipher.Value = encryptedValue;
	cipher.To = data.toString();

	return cipher;
};
