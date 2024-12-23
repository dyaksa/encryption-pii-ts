// index.ts
import CryptoTs from '../index';
import { Profile } from './entity/profile_entity';
import { encryptWithAes } from '../crypto-ts/lib/aes_encryption';
import { dt_conf } from '../crypto-ts/lib/config';

// Example usage
const main = async () => {
	const dt = await dt_conf();

	const profile = new Profile();
	profile.name = encryptWithAes('AES_256_CBC', 'Dyaksa Rahadia');
	profile.email = encryptWithAes('AES_256_CBC', 'dyaksa.rahadian@gmail.com');
	profile.phone = encryptWithAes('AES_256_CBC', '0899361449');

	const blindIdx = await CryptoTs.buildBlindIndex(profile);

	console.log(blindIdx);

	// Create an SQL query for insertion
	const query = `
        INSERT INTO "profile" 
        (name, name_bidx, email, email_bidx, phone, phone_bidx) 
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

	const values = [
		blindIdx.name,
		blindIdx.name_bidx,
		blindIdx.email,
		blindIdx.email_bidx,
		blindIdx.phone,
		blindIdx.phone_bidx,
	];

	await dt.query(query, values);

	console.log('User has been saved:', profile);

	await dt.destroy();
};

main().catch((error) => console.log('Error:', error));
