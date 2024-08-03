import { randomFillSync } from 'crypto';
import { Buffer } from 'buffer';
import * as cryptoJs from 'crypto-js';

const KEY_SIZE_1KB = 1 << 10; // 1024
const KEY_SIZE_2KB = 1 << 11; // 2048
const KEY_SIZE_4KB = 1 << 12; // 4096

const HMAC_MINIMUM_KEY_SIZE = 8;
const AES_128_KEY_SIZE = 16;
const AES_192_KEY_SIZE = 24;
const AES_256_KEY_SIZE = 32;

const MIN_CUSTOM_KEY_LEN = 32;

const IV_SIZE = 12;

/**
 * @param size {number}
 * @return {string}
 */
const generateRandomIV = (size: number = IV_SIZE): string => {
	const buf = Buffer.alloc(size);
	return randomFillSync(buf).toString('hex');
};

/**
 * Validate & check key input must be greater than minimum custom key length
 * @param key {any}
 * @return {void | Error}
 */
const checkKeyInput = (key: any): void | Error => {
	if (key.length < MIN_CUSTOM_KEY_LEN) {
		throw new Error(`key cannot be less than ${MIN_CUSTOM_KEY_LEN}`);
	}
};

function pkcs5Padding(plainText: Uint8Array): Uint8Array {
	const blockSize = 32; // AES block size is 32 bytes
	const padding = blockSize - (plainText.length % blockSize);
	const padtext = new Uint8Array(padding).fill(padding);
	const paddedText = new Uint8Array(plainText.length + padding);

	paddedText.set(plainText);
	paddedText.set(padtext, plainText.length);

	return paddedText;
}

// Fungsi unpadding untuk menghapus padding PKCS5
function PKCS5UnPadding(data: cryptoJs.lib.WordArray): cryptoJs.lib.WordArray {
	const paddingSize = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
	const unpaddedSigBytes = data.sigBytes - paddingSize;
	return cryptoJs.lib.WordArray.create(data.words, unpaddedSigBytes);
}

function generateRandIV(size: number): cryptoJs.lib.WordArray {
	return cryptoJs.lib.WordArray.random(size);
}

function PKCS5Padding(data: string): cryptoJs.lib.WordArray {
	const blockSize = 16;
	const paddingSize = blockSize - (data.length % blockSize);
	const padding = String.fromCharCode(paddingSize).repeat(paddingSize);
	return cryptoJs.enc.Utf8.parse(data + padding);
}

function wordArrayToBuffer(wordArray: cryptoJs.lib.WordArray): Buffer {
	const words = wordArray.words;
	const sigBytes = wordArray.sigBytes;
	const buffer = Buffer.alloc(sigBytes);

	for (let i = 0; i < sigBytes; i++) {
		buffer[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	}

	return buffer;
}

function bufferToWordArray(buffer: Buffer): cryptoJs.lib.WordArray {
	const length = buffer.length;
	const words = [];
	for (let i = 0; i < length; i += 4) {
		words.push(
			(buffer[i] << 24) |
				(buffer[i + 1] << 16) |
				(buffer[i + 2] << 8) |
				buffer[i + 3],
		);
	}
	return cryptoJs.lib.WordArray.create(words, length);
}

export default {
	checkKeyInput,
	generateRandomIV,
	generateRandIV,
	wordArrayToBuffer,
	bufferToWordArray,
	PKCS5Padding,
	pkcs5Padding,
	PKCS5UnPadding,
	KEY_SIZE_1KB,
	KEY_SIZE_2KB,
	KEY_SIZE_4KB,
	HMAC_MINIMUM_KEY_SIZE,
	AES_128_KEY_SIZE,
	AES_192_KEY_SIZE,
	AES_256_KEY_SIZE,
};
