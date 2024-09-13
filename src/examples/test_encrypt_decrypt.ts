import CryptoTs from '../index';

const data = 'Mohamad Ali Farhan';

// Encrypt
const encryptedHex = CryptoTs.encryptWithAes('AES_256_CBC', data);
console.log('Encrypted Data (Hex):', encryptedHex);

// Decrypt
const decryptedData = CryptoTs.decryptWithAes(
	'AES_256_CBC',
	Buffer.from('')
);
console.log('Decrypt Data:', decryptedData);

