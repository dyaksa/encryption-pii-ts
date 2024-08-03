import CryptoTs from '../index';
import { dt_conf } from "../crypto-ts/lib/config"

// const main = async () => {
// 	const dt = await dt_conf();

// 	const query = `SELECT recipient_wa_number FROM ba_activations WHERE id='ffe66b84-dcfb-4b7f-9fa8-cf4e27c42249'`;

// 	const result = await dt.query(query);
// 	console.log("fetch Data",result[0].recipient_wa_number);

// 	// Decrypt
// 	const decryptedData = CryptoTs.decryptWithAes(
// 		'AES_256_CBC',
// 		result[0].recipient_wa_number,
// 	);
// 	console.log('Decrypt Data:', decryptedData);

// 	await dt.destroy();
// };

// const main = async () => {
// 	const dt = await dt_conf();

// 	const query = `SELECT name FROM users WHERE id='38d8135e-eddf-4812-bf13-46033e5fd080'`;

// 	const result = await dt.query(query);
// 	console.log(result[0].name);

// 	// Decrypt
// 	const decryptedData = CryptoTs.decryptWithAes(
// 		'AES_256_CBC',
// 		result[0].name,
// 	);
// 	console.log('Decrypt Data:', decryptedData);

	
// 	await dt.destroy();
// };

const main = async () => {
	const dt = await dt_conf();

	const query = `SELECT name, email, phone FROM profile WHERE id='d1f02684-de64-4ccf-929f-71e463fc4729'`;

	const result = await dt.query(query);

	// Decrypt
	const name = CryptoTs.decryptWithAes(
		'AES_256_CBC',
		result[0].name,
	);
	const email = CryptoTs.decryptWithAes(
		'AES_256_CBC',
		result[0].email,
	);
	const phone = CryptoTs.decryptWithAes(
		'AES_256_CBC',
		result[0].phone,
	);
	console.log('Name Data:', name);
	console.log('Email Data:', email);
	console.log('Phone Data:', phone);

	
	await dt.destroy();
};

main().catch((error) => console.log('Error:', error));
