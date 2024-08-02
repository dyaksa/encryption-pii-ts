declare function PKCS5Padding(plainText: Uint8Array): Uint8Array;
declare function uint8ArrayToHex(array: Uint8Array): string;
declare const _default: {
    checkKeyInput: (key: any) => void | Error;
    generateRandomIV: (size?: number) => string;
    PKCS5Padding: typeof PKCS5Padding;
    uint8ArrayToHex: typeof uint8ArrayToHex;
    KEY_SIZE_1KB: number;
    KEY_SIZE_2KB: number;
    KEY_SIZE_4KB: number;
    HMAC_MINIMUM_KEY_SIZE: number;
    AES_128_KEY_SIZE: number;
    AES_192_KEY_SIZE: number;
    AES_256_KEY_SIZE: number;
};
export default _default;
