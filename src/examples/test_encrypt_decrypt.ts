import CryptoTs from "../index";

const data = "Dyaksa";

// Encrypt
const encryptedHex = CryptoTs.encryptWithAes("AES_256_CBC", data);
console.log('Encrypted Data (Hex):', encryptedHex);

// // Decrypt
const decryptedData =  CryptoTs.decryptWithAes("AES_256_CBC", encryptedHex.Value);
console.log('Encrypted Data:', decryptedData);

