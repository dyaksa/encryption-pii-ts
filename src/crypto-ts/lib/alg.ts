// https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback
// private and public key pair type
export const RSA_KEY_PAIR: string = 'rsa';
export const RSA_PSS_KEY_PAIR: string = 'rsa-pss';
export const DSA_KEY_PAIR: string = 'dsa';
export const EC_KEY_PAIR: string = 'ec';
export const ED25519_KEY_PAIR: string = 'ed25519';
export const ED448_KEY_PAIR: string = 'ed448';
export const X25519_KEY_PAIR: string = 'x25519';
export const X448_KEY_PAIR: string = 'x448';
export const DH_KEY_PAIR: string = 'dh';

// sign Algorithm
export const RSA_SIGN_MD5: string = 'RSA-MD5';
export const RSA_SIGN_SHA1: string = 'RSA-SHA1';
export const RSA_SIGN_SHA256: string = 'RSA-SHA256';
export const RSA_SIGN_SHA384: string = 'RSA-SHA384';
export const RSA_SIGN_SHA512: string = 'RSA-SHA512';
export const RSA_SIGN_SHA512_224: string = 'RSA-SHA512/224';
export const RSA_SIGN_SHA512_256: string = 'RSA-SHA512/256';
export const RSA_SIGN_SM3: string = 'RSA-SM3';

// digest Algorithm
// from Linux Terminal
// $ openssl list -digest-algorithms
export const MD5_DIGEST: string = 'md5';
export const SHA1_DIGEST: string = 'sha1';
export const SHA256_DIGEST: string = 'sha256';
export const SHA384_DIGEST: string = 'sha384';
export const SHA512_DIGEST: string = 'sha512';

// key generator
export const HMAC_KEY_GENERATOR: string = 'hmac';
export const AES_KEY_GENERATOR: string = 'aes';

// asymmetric key
export const PKCS1_PUBLIC_KEY_TYPE: string = 'pkcs1';
export const SPKI_PUBLIC_KEY_TYPE: string = 'spki';

export const PKCS1_PRIVATE_KEY_TYPE: string = 'pkcs1';
export const PKCS8_PRIVATE_KEY_TYPE: string = 'pkcs8';
export const SEC1_PRIVATE_KEY_TYPE: string = 'sec1';

export const PEM_PUBLIC_PRIVATE_KEY_FORMAT: string = 'pem';
export const DER_PUBLIC_PRIVATE_KEY_FORMAT: string = 'der';
export const JWK_PUBLIC_PRIVATE_KEY_FORMAT: string = 'jwk';

// cipher Algorithm
// from Linux Terminal
// $ openssl list -cipher-algorithms
export const AES_128_CBC: string = 'aes-128-cbc';
export const AES_192_CBC: string = 'aes-192-cbc';
export const AES_256_CBC: string = 'aes-256-cbc';

export const AES_128_GCM: string = 'aes-128-gcm';
export const AES_192_GCM: string = 'aes-192-gcm';
export const AES_256_GCM: string = 'aes-256-gcm';

export const AES_128_CCM: string = 'aes-128-ccm';
export const AES_192_CCM: string = 'aes-192-ccm';
export const AES_256_CCM: string = 'aes-256-ccm';

export const AES_128_OCB: string = 'aes-128-ocb';
export const AES_192_OCB: string = 'aes-192-ocb';
export const AES_256_OCB: string = 'aes-256-ocb';
