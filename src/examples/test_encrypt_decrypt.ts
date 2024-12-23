import CryptoTs from '../index';

const data = 'TEST-PARTNER';

// Encrypt
const encryptedHex = CryptoTs.encryptWithAes('AES_256_CBC', data);
console.log('Encrypted Data (Hex):', encryptedHex.Value.toString());

// // Decrypt
const decryptedData = CryptoTs.decryptWithAes(
	'AES_256_CBC',
	encryptedHex.Value
);
console.log('Decrypt Data:', decryptedData);

