import CryptoTs from '../index';
import { dt_conf } from "../crypto-ts/lib/config"

const main = async () => {
	const dt = await dt_conf();

	const query = `SELECT recipient_wa_number FROM ba_activations WHERE id='87f6bd8d-907f-4e66-847a-b89572c38769'`;

	const result = await dt.query(query);
	console.log(result[0].recipient_wa_number);

	// Decrypt
	const decryptedData = CryptoTs.decryptWithAes(
		'AES_256_CBC',
		result[0].recipient_wa_number,
	);
	console.log('Decrypt Data:', decryptedData);

	
	await dt.destroy();
};


main().catch((error) => console.log('Error:', error));
