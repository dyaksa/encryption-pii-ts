import { createSign, createVerify, constants, SignPrivateKeyInput, VerifyPublicKeyInput } from 'crypto';
import alg from './alg';

// Note:
// this signature mechanism uses RSA PKCS1 PSS PADDING

/**
 * Create new signer
 * @param algorithm {string}
 * @returns {Sign}
 */
const newSigner = (algorithm: string) => createSign(algorithm);

/**
 * Create new verifier
 * @param algorithm {string}
 * @returns {Verify}
 */
const newVerifier = (algorithm: string) => createVerify(algorithm);

/**
 * Update data of Signer or Verifier
 * @param signerVerifier
 * @param datas
 * @return {*}
 */
const updateSignerVerifierData = (signerVerifier: any, datas: (string | Buffer)[]) => {
  for (const data of datas) {
    signerVerifier.update(data);
  }

  signerVerifier.end();

  return signerVerifier;
};

/**
 * Update verifier
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @returns {Verify}
 */
const updateVerify = (algorithm: string, datas: (string | Buffer)[]) => {
  const verifier = newVerifier(algorithm);
  return updateSignerVerifierData(verifier, datas);
};

/**
 * Update signer
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @returns {Sign}
 */
const updateSign = (algorithm: string, datas: (string | Buffer)[]) => {
  const signer = newSigner(algorithm);
  return updateSignerVerifierData(signer, datas);
};

/**
 *
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param algorithm {string}
 * @param datas {string | Buffer}
 * @return {string}
 */
const commonSignWithPSS = (privateKey: Buffer | SignPrivateKeyInput, algorithm: string, datas: (string | Buffer)[]) => {
  const signer = updateSign(algorithm, datas);
  const signature = signer.sign({
    key: privateKey,
    padding: constants.RSA_PKCS1_PSS_PADDING,
    saltLength: constants.RSA_PSS_SALTLEN_DIGEST
  }, 'hex');
  return signature;
};

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param algorithm {string}
 * @param signature {string}
 * @param datas {string | Buffer}
 * @return {boolean}
 */
const commonVerifyWithPSS = (publicKey: Buffer | VerifyPublicKeyInput, algorithm: string, signature: string, datas: (string | Buffer)[]) => {
  const verifier = updateVerify(algorithm, datas);
  return verifier.verify({
    key: publicKey,
    padding: constants.RSA_PKCS1_PSS_PADDING,
    saltLength: constants.RSA_PSS_SALTLEN_DIGEST
  }, signature, 'hex');
};

/**
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const signWithPSSMd5 = (privateKey: Buffer | SignPrivateKeyInput, ...datas: (string | Buffer)[]) => commonSignWithPSS(privateKey, alg.RSA_SIGN_MD5, datas);

/**
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const signWithPSSSha1 = (privateKey: Buffer | SignPrivateKeyInput, ...datas: (string | Buffer)[]) => commonSignWithPSS(
  privateKey,
  alg.RSA_SIGN_SHA1,
  datas,
);

/**
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const signWithPSSSha256 = (privateKey: Buffer | SignPrivateKeyInput, ...datas: (string | Buffer)[]) => commonSignWithPSS(
  privateKey,
  alg.RSA_SIGN_SHA256,
  datas,
);

/**
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const signWithPSSSha384 = (privateKey: Buffer | SignPrivateKeyInput, ...datas: (string | Buffer)[]) => commonSignWithPSS(
  privateKey,
  alg.RSA_SIGN_SHA384,
  datas,
);

/**
 * @param privateKey {Buffer | SignPrivateKeyInput}
 * @param datas {string | Buffer}
 * @returns {string}
 */
export const signWithPSSSha512 = (privateKey: Buffer | SignPrivateKeyInput, ...datas: (string | Buffer)[]) => commonSignWithPSS(
  privateKey,
  alg.RSA_SIGN_SHA512,
  datas,
);

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param datas {string | Buffer}
 * @param signature {string}
 * @returns {boolean}
 */
export const verifyWithPSSMd5 = (publicKey: Buffer | VerifyPublicKeyInput, signature: string, ...datas: (string | Buffer)[]) => commonVerifyWithPSS(
  publicKey,
  alg.RSA_SIGN_MD5,
  signature,
  datas,
);

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param datas {string | Buffer}
 * @param signature {string}
 * @returns {boolean}
 */
export const verifyWithPSSSha1 = (publicKey: Buffer | VerifyPublicKeyInput, signature: string, ...datas: (string | Buffer)[]) => commonVerifyWithPSS(
  publicKey,
  alg.RSA_SIGN_SHA1,
  signature,
  datas,
);

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param datas {string | Buffer}
 * @param signature {string}
 * @returns {boolean}
 */
export const verifyWithPSSSha256 = (publicKey: Buffer | VerifyPublicKeyInput, signature: string, ...datas: (string | Buffer)[]) => commonVerifyWithPSS(
  publicKey,
  alg.RSA_SIGN_SHA256,
  signature,
  datas,
);

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param datas {string | Buffer}
 * @param signature {string}
 * @returns {boolean}
 */
export const verifyWithPSSSha384 = (publicKey: Buffer | VerifyPublicKeyInput, signature: string, ...datas: (string | Buffer)[]) => commonVerifyWithPSS(
  publicKey,
  alg.RSA_SIGN_SHA384,
  signature,
  datas,
);

/**
 * @param publicKey {Buffer | VerifyPublicKeyInput}
 * @param datas {string | Buffer}
 * @param signature {string}
 * @returns {boolean}
 */
export const verifyWithPSSSha512 = (publicKey: Buffer | VerifyPublicKeyInput, signature: string, ...datas: (string | Buffer)[]) => commonVerifyWithPSS(
  publicKey,
  alg.RSA_SIGN_SHA512,
  signature,
  datas,
);
