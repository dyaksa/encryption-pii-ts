import CryptoTs from "../index";

const data = "Dyaksa";

// Encrypt
const encrypted = CryptoTs.encryptWithAes("AES_256_CBC", data);
console.log('Encrypted Data (Hex):', encrypted);

// Decrypt
const decryptedData =  CryptoTs.decryptWithAes("AES_256_CBC", encrypted);
console.log('Encrypted Data (Hex):', decryptedData);

