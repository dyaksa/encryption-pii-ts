import { randomFillSync } from 'crypto';
import { Buffer } from 'buffer';

export const KEY_SIZE_1KB = 1 << 10; // 1024
export const KEY_SIZE_2KB = 1 << 11; // 2048
export const KEY_SIZE_4KB = 1 << 12; // 4096

export const HMAC_MINIMUM_KEY_SIZE = 8;
export const AES_128_KEY_SIZE = 16;
export const AES_192_KEY_SIZE = 24;
export const AES_256_KEY_SIZE = 32;

export const MIN_CUSTOM_KEY_LEN = 32;

export const IV_SIZE = 12;

/**
 * @param size {number}
 * @return {string}
 */
export const generateRandomIV = (size: number = IV_SIZE): string => {
  const buf = Buffer.alloc(size);
  return randomFillSync(buf).toString('hex');
};

/**
 * Validate & check key input must be greater than minimum custom key length
 * @param key {string | Buffer}
 * @return {void | Error}
 */
export const checkKeyInput = (key: string | Buffer): void | Error => {
  if (key.length < MIN_CUSTOM_KEY_LEN) {
    throw new Error(`key cannot be less than ${MIN_CUSTOM_KEY_LEN}`);
  }
};
