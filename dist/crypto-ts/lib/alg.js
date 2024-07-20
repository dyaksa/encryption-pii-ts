"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback
// private and public key pair type
const RSA_KEY_PAIR = 'rsa';
const RSA_PSS_KEY_PAIR = 'rsa-pss';
const DSA_KEY_PAIR = 'dsa';
const EC_KEY_PAIR = 'ec';
const ED25519_KEY_PAIR = 'ed25519';
const ED448_KEY_PAIR = 'ed448';
const X25519_KEY_PAIR = 'x25519';
const X448_KEY_PAIR = 'x448';
const DH_KEY_PAIR = 'dh';
// sign Algorithm
const RSA_SIGN_MD5 = 'RSA-MD5';
const RSA_SIGN_SHA1 = 'RSA-SHA1';
const RSA_SIGN_SHA256 = 'RSA-SHA256';
const RSA_SIGN_SHA384 = 'RSA-SHA384';
const RSA_SIGN_SHA512 = 'RSA-SHA512';
const RSA_SIGN_SHA512_224 = 'RSA-SHA512/224';
const RSA_SIGN_SHA512_256 = 'RSA-SHA512/256';
const RSA_SIGN_SM3 = 'RSA-SM3';
// digest Algorithm
// from Linux Terminal
// $ openssl list -digest-algorithms
const MD5_DIGEST = 'md5';
const SHA1_DIGEST = 'sha1';
const SHA256_DIGEST = 'sha256';
const SHA384_DIGEST = 'sha384';
const SHA512_DIGEST = 'sha512';
// key generator
const HMAC_KEY_GENERATOR = 'hmac';
const AES_KEY_GENERATOR = 'aes';
// asymmetric key
const PKCS1_PUBLIC_KEY_TYPE = 'pkcs1';
const SPKI_PUBLIC_KEY_TYPE = 'spki';
const PKCS1_PRIVATE_KEY_TYPE = 'pkcs1';
const PKCS8_PRIVATE_KEY_TYPE = 'pkcs8';
const SEC1_PRIVATE_KEY_TYPE = 'sec1';
const PEM_PUBLIC_PRIVATE_KEY_FORMAT = 'pem';
const DER_PUBLIC_PRIVATE_KEY_FORMAT = 'der';
const JWK_PUBLIC_PRIVATE_KEY_FORMAT = 'jwk';
// cipher Algorithm
// from Linux Terminal
// $ openssl list -cipher-algorithms
const AES_128_CBC = 'aes-128-cbc';
const AES_192_CBC = 'aes-192-cbc';
const AES_256_CBC = 'aes-256-cbc';
const AES_128_GCM = 'aes-128-gcm';
const AES_192_GCM = 'aes-192-gcm';
const AES_256_GCM = 'aes-256-gcm';
const AES_128_CCM = 'aes-128-ccm';
const AES_192_CCM = 'aes-192-ccm';
const AES_256_CCM = 'aes-256-ccm';
const AES_128_OCB = 'aes-128-ocb';
const AES_192_OCB = 'aes-192-ocb';
const AES_256_OCB = 'aes-256-ocb';
exports.default = {
    RSA_KEY_PAIR,
    RSA_PSS_KEY_PAIR,
    DSA_KEY_PAIR,
    EC_KEY_PAIR,
    ED25519_KEY_PAIR,
    ED448_KEY_PAIR,
    X25519_KEY_PAIR,
    X448_KEY_PAIR,
    DH_KEY_PAIR,
    RSA_SIGN_MD5,
    RSA_SIGN_SHA1,
    RSA_SIGN_SHA256,
    RSA_SIGN_SHA384,
    RSA_SIGN_SHA512,
    RSA_SIGN_SHA512_224,
    RSA_SIGN_SHA512_256,
    RSA_SIGN_SM3,
    MD5_DIGEST,
    SHA1_DIGEST,
    SHA256_DIGEST,
    SHA384_DIGEST,
    SHA512_DIGEST,
    HMAC_KEY_GENERATOR,
    AES_KEY_GENERATOR,
    PKCS1_PUBLIC_KEY_TYPE,
    SPKI_PUBLIC_KEY_TYPE,
    PKCS1_PRIVATE_KEY_TYPE,
    PKCS8_PRIVATE_KEY_TYPE,
    SEC1_PRIVATE_KEY_TYPE,
    PEM_PUBLIC_PRIVATE_KEY_FORMAT,
    DER_PUBLIC_PRIVATE_KEY_FORMAT,
    JWK_PUBLIC_PRIVATE_KEY_FORMAT,
    AES_128_CBC,
    AES_192_CBC,
    AES_256_CBC,
    AES_128_GCM,
    AES_192_GCM,
    AES_256_GCM,
    AES_128_CCM,
    AES_192_CCM,
    AES_256_CCM,
    AES_128_OCB,
    AES_192_OCB,
    AES_256_OCB,
};
