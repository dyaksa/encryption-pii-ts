import { KeyObject } from 'crypto';
/**
 *
 * @param algorithm {string}
 * @param key {string | Buffer}
 * @param datas {string | Buffer}
 * @return {string}
 */
export declare const commonGenerateDigest: (algorithm: string, key: Buffer | KeyObject, ...datas: (string | Buffer)[]) => string;
