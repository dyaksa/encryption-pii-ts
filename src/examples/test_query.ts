
// index.ts
import CryptoTs from '../index';
import { User } from './entity/user_entity';
import { encryptWithAes } from '../crypto-ts/lib/aes_encryption';
import { dt_conf } from '../crypto-ts/lib/config';

// Example usage
const main = async () => {

	const dt = await dt_conf();

	const user = new User();
    user.name = encryptWithAes('AES_256_CBC','Dyaksa Djauharudin');
    user.email = encryptWithAes('AES_256_CBC','dyaksa@yopmail.com');
    user.address = encryptWithAes('AES_256_CBC', 'Demak');
	user.phone = encryptWithAes('AES_256_CBC', '0899361449');
    user.nik = encryptWithAes('AES_256_CBC', '3215012506200001');
    user.npwp = encryptWithAes('AES_256_CBC', '311501230697000');
    user.age = 25;
    user.password = 'uhuyuhuy';

    const blindIdx = await CryptoTs.buildBlindIndex(user);

	// Create an SQL query for insertion
    const query = `
        INSERT INTO "users" 
        (name, name_bidx, email, email_bidx, address, address_bidx, phone, phone_bidx, nik, nik_bidx, npwp, npwp_bidx, age, password) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    // Array of values corresponding to the placeholders in the query
    const values = [
        blindIdx.name, blindIdx.name_bidx,
        blindIdx.email, blindIdx.email_bidx,
        blindIdx.address, blindIdx.address_bidx,
        blindIdx.phone, blindIdx.phone_bidx,
        blindIdx.nik, blindIdx.nik_bidx,
        blindIdx.npwp, blindIdx.npwp_bidx,
        user.age, user.password
    ];

	await dt.query(query, values);

	console.log('User has been saved:', user);

	await dt.destroy();
};

main().catch((error) => console.log('Error:', error));

