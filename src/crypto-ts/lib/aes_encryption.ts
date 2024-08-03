import { createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';
import algorithms from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';
import { AesCipher } from './types';

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
        throw new Error('Invalid AES algorithm format. Expected format: AES_<keyLength>_<mode>');
    }

    const keyLenInt = parseInt(algSplited[1], 10);
    let ivLen;

    switch (algSplited[2].toLowerCase()) {
        case 'cbc':
            ivLen = 16;
            break;
        case 'ocb':
            ivLen = 15; // Set to 15 for OCB mode, but can be adjusted as needed
            break;
        default:
            ivLen = 12; // Default IV length
            break;
    }

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
// const decrypt = (alg: string, key: string, data: string | Buffer): string => {
// 	const metaAlg = getMetaFromAlgorithm(alg);

// 	if (key.length !== metaAlg.expectedKeyLen) {
// 		throw new Error(`Invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
// 	}

// 	const keyBuf = Buffer.from(key);

// 	// Ubah buffer numerik kembali menjadi buffer biner
// 	const hexString = data.toString('utf-8');
// 	const buf = Buffer.from(hexString.match(/.{1,3}/g)!.map(num => parseInt(num, 10)));
	
// 	const iv = buf.slice(0, metaAlg.ivLen);
// 	const encryptedBuf = buf.slice(metaAlg.ivLen);

// 	// Buat instance decipher
// 	const decipher = createDecipheriv(alg, keyBuf, iv);

// 	// Dekripsi data
// 	const decrypted = Buffer.concat([
// 		decipher.update(encryptedBuf),
// 		decipher.final(),
// 	]);

// 	// Hapus padding PKCS#5 (PKCS#7)
// 	const unpaddedData = keyUtil.pkcs5UnPadding(decrypted);

// 	return unpaddedData.toString('utf-8');
// };


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
    if (keyBuf.length !== metaAlg.expectedKeyLen) {
        throw new Error(
            `Invalid key length after conversion, expected ${metaAlg.expectedKeyLen} bytes but got ${keyBuf.length} bytes`,
        );
    }

    // Convert data to a buffer if it's a string
    const encryptedBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data, 'hex');

    if (encryptedBuffer.length < 16) {
        throw new Error('Invalid encrypted data');
    }

    // Extract IV (first 16 bytes) and the encrypted data
    const iv = encryptedBuffer.slice(0, 16);
    const encryptedData = encryptedBuffer.slice(16);
	
    if (encryptedData.length % 16 !== 0) {
        throw new Error('Invalid encrypted data length');
    }

    // Create a decipher instance
    const decipher = createDecipheriv(alg, keyBuf, iv);

	console.log(encryptedData);

    // Decrypt the data
	let decryptedData = Buffer.concat([
		decipher.update(encryptedData),
		decipher.final(),
	]);

	// Remove PKCS#5 (PKCS#7) padding
	decryptedData = keyUtil.pkcs5UnPadding(decryptedData);

	// Convert decrypted buffer to string
	return decryptedData.toString('utf-8');
};


export const decryptWithAes = (type: string, data: string | Buffer): string => {
	const key = process.env.CRYPTO_AES_KEY;
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
		throw new Error(`invalid key length, key length should be ${metaAlg.expectedKeyLen}`);
	}

	// Tambahkan padding pada data
	const plainDataPadded = keyUtil.pkcs5Padding(Buffer.from(data));

	// Generate random IV (initialization vector)
	const iv = Buffer.alloc(metaAlg.ivLen); // Panjang IV berdasarkan algoritma
	keyUtil.generateRandIV(iv);

	// Konversi kunci ke buffer
	const keyB = Buffer.from(key);

	// Buat instance cipher
	const cipher = createCipheriv(alg, keyB, iv);

	// Enkripsi data yang sudah dipadding
	const encrypted = Buffer.concat([
		cipher.update(plainDataPadded),
		cipher.final(),
	]);

	// Gabungkan IV dan data terenkripsi ke dalam satu buffer
	const resultBuffer = Buffer.concat([iv, encrypted]);

	// Konversi buffer ke full number (opsional, jika Anda membutuhkan ini)
	const numericBuffer = Buffer.alloc(resultBuffer.length * 3);
	for (let i = 0; i < resultBuffer.length; i++) {
		const numStr = resultBuffer[i].toString().padStart(3, '0');
		numericBuffer.write(numStr, i * 3, 3, 'utf-8');
	}

	return numericBuffer;
};

// const encrypt = (alg: string, key: string, data: string | Buffer): Buffer => {
// 	const metaAlg = getMetaFromAlgorithm(alg);

// 	if (key.length !== metaAlg.expectedKeyLen) {
// 		throw new Error(
// 			`invalid key length, key length should be ${metaAlg.expectedKeyLen}`,
// 		);
// 	}

// 	const plainDataPadded = keyUtil.pkcs5Padding(Buffer.from(data));

// 	 // Generate random IV (initialization vector)
// 	 const iv = Buffer.alloc(16); // 16 bytes for AES block size
// 	 keyUtil.generateRandIV(iv);
 
// 	 const keyB = Buffer.from(key);
 
// 	 // Create cipher instance
// 	 const cipher = createCipheriv(alg, keyB, iv);
 
// 	 // Encrypt the padded data
// 	 const encrypted = Buffer.concat([
// 		 cipher.update(plainDataPadded),
// 		 cipher.final(),
// 	 ]);
 
// 	 // Concatenate IV and encrypted data into one buffer
// 	 const resultBuffer = Buffer.concat([iv, encrypted]);
 
// 	 return resultBuffer;
	
// };

export const encryptWithAes = (type: string, data: string | Buffer): any => {
	const key = process.env.CRYPTO_AES_KEY;
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
