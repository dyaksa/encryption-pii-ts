import { Buffer } from 'buffer';
export declare const encryptWithAes: (type: string, data: string | Buffer) => string;
export declare const decryptWithAes: (type: string, data: string | Buffer) => string;
