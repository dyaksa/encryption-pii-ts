import { Buffer } from 'buffer';
/**
 * Convert buffer input to string
 * @param buffer {string | Buffer}
 * @return {string}
 */
declare const bufferToString: (buffer: string | Buffer) => string;
/**
 * Check if input is valid buffer
 * @param buffer {Buffer}
 * @return {void | Error}
 */
declare const checkBuffer: (buffer: Buffer) => void | Error;
export { checkBuffer, bufferToString, };
