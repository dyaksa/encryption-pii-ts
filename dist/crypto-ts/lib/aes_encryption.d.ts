import { Buffer } from 'buffer';
export declare const decryptWithAes: (type: string, data: string | Buffer) => Promise<string>;
export declare const encryptWithAes: (type: string, data: string | Buffer) => Promise<any>;
