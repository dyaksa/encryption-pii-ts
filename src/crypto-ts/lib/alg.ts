// https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback
// private and public key pair type
const RSA_KEY_PAIR: string = 'rsa';
const RSA_PSS_KEY_PAIR: string = 'rsa-pss';
const DSA_KEY_PAIR: string = 'dsa';
const EC_KEY_PAIR: string = 'ec';
const ED25519_KEY_PAIR: string = 'ed25519';
const ED448_KEY_PAIR: string = 'ed448';
const X25519_KEY_PAIR: string = 'x25519';
const X448_KEY_PAIR: string = 'x448';
const DH_KEY_PAIR: string = 'dh';

// sign Algorithm
const RSA_SIGN_MD5: string = 'RSA-MD5';
const RSA_SIGN_SHA1: string = 'RSA-SHA1';
const RSA_SIGN_SHA256: string = 'RSA-SHA256';
const RSA_SIGN_SHA384: string = 'RSA-SHA384';
const RSA_SIGN_SHA512: string = 'RSA-SHA512';
const RSA_SIGN_SHA512_224: string = 'RSA-SHA512/224';
const RSA_SIGN_SHA512_256: string = 'RSA-SHA512/256';
const RSA_SIGN_SM3: string = 'RSA-SM3';

// digest Algorithm
// from Linux Terminal
// $ openssl list -digest-algorithms
const MD5_DIGEST: string = 'md5';
const SHA1_DIGEST: string = 'sha1';
const SHA256_DIGEST: string = 'sha256';
const SHA384_DIGEST: string = 'sha384';
const SHA512_DIGEST: string = 'sha512';

// key generator
const HMAC_KEY_GENERATOR: string = 'hmac';
const AES_KEY_GENERATOR: string = 'aes';

// asymmetric key
const PKCS1_PUBLIC_KEY_TYPE: string = 'pkcs1';
const SPKI_PUBLIC_KEY_TYPE: string = 'spki';

const PKCS1_PRIVATE_KEY_TYPE: string = 'pkcs1';
const PKCS8_PRIVATE_KEY_TYPE: string = 'pkcs8';
const SEC1_PRIVATE_KEY_TYPE: string = 'sec1';

const PEM_PUBLIC_PRIVATE_KEY_FORMAT: string = 'pem';
const DER_PUBLIC_PRIVATE_KEY_FORMAT: string = 'der';
const JWK_PUBLIC_PRIVATE_KEY_FORMAT: string = 'jwk';

// cipher Algorithm
// from Linux Terminal
// $ openssl list -cipher-algorithms
const AES_128_CBC: string = 'aes-128-cbc';
const AES_192_CBC: string = 'aes-192-cbc';
const AES_256_CBC: string = 'aes-256-cbc';

const AES_128_GCM: string = 'aes-128-gcm';
const AES_192_GCM: string = 'aes-192-gcm';
const AES_256_GCM: string = 'aes-256-gcm';

const AES_128_CCM: string = 'aes-128-ccm';
const AES_192_CCM: string = 'aes-192-ccm';
const AES_256_CCM: string = 'aes-256-ccm';

const AES_128_OCB: string = 'aes-128-ocb';
const AES_192_OCB: string = 'aes-192-ocb';
const AES_256_OCB: string = 'aes-256-ocb';

export default {
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
