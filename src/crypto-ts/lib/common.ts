import { Buffer } from 'buffer';

/**
 * Convert buffer input to string
 * @param buffer {string | Buffer}
 * @return {string}
 */
const bufferToString = (buffer: string | Buffer): string => {
	if (Buffer.isBuffer(buffer)) {
		return buffer.toString();
	}
	return buffer;
};

/**
 * Check if input is valid buffer
 * @param buffer {Buffer}
 * @return {void | Error}
 */
const checkBuffer = (buffer: Buffer): void | Error => {
	if (!Buffer.isBuffer(buffer)) {
		throw new Error('data param should be buffer');
	}
};

export {
	checkBuffer,
	bufferToString,
};
