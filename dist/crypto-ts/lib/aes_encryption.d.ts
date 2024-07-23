import { Buffer } from 'buffer';
import { AesCipher } from './types';
export declare const decryptWithAes: (type: string, data: string | Buffer) => string;
export declare const encryptWithAes: (type: string, data: string | Buffer) => AesCipher;
