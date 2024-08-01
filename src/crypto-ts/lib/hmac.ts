import { createHmac, KeyObject } from 'crypto';
import alg from './alg';
import keyUtil from './key_util';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * HMAC digest
 * @param algorithm {string}
 * @param key {string | Buffer}
 * @param datas {string | Buffer}
 * @returns {string}
 */
const digest = (algorithm: string, key: string | Buffer, datas: (string | Buffer)[]): string => {
	const hmac = createHmac(algorithm, key);
	for (const data of datas) {
		hmac.update(data.toString());
	}

	return hmac.digest('hex');
};

/**
 *
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @return {string}
 */
export const commonGenerateDigest = (algorithm: string, ...datas: (string | Buffer)[]): string => { 
	const key = process.env.CRYPTO_HMAC_KEY;
	keyUtil.checkKeyInput(key);

	switch (algorithm.toUpperCase()) {
		case 'MD5':
			return digest(alg.MD5_DIGEST, key, datas);
		case 'SHA1':
			return digest(alg.SHA1_DIGEST, key, datas);
		case 'SHA256':
			return digest(alg.SHA256_DIGEST, key, datas);
		case 'SHA384':
			return digest(alg.SHA384_DIGEST, key, datas);
		case 'SHA512':
			return digest(alg.SHA512_DIGEST, key, datas);
		default:
			throw new Error(`Unsupported algorithm: ${algorithm}`);
	}
};
