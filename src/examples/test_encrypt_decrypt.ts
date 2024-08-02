import CryptoTs from '../index';

const data = 'Dyaksa Jauharuddin Nour';

// Encrypt
const encryptedHex = CryptoTs.encryptWithAes('AES_256_CBC', data)
	.then((res) => {
		console.log('Encrypted Data:', res);
	})
	.catch((err) => {
		console.error(err);
	});

const decryptData = CryptoTs.decryptWithAes(
	'AES_256_CBC',
	'fb79531d327ba376232f38a4493e2544e3e3655e7f7ae3056d9afc3d1958509278d4381730208f92c2e130a6364f817c',
)
	.then((res) => {
		console.log('Decrypted Data:', res);
	})
	.catch((err) => {
		console.error(err);
	});

// Decrypt
// const decryptedData =  CryptoTs.decryptWithAes("AES_256_CBC", encryptedHex.Value);
// console.log('Encrypted Data:', decryptedData);
