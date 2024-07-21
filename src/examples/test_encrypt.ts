import CryptoTs from "../index";

const data = "Dyaksa";

// Encrypt
const encryptData = CryptoTs.encryptWithAes("AES_256_CBC", data);

console.log('Encrypted Data:', encryptData);
