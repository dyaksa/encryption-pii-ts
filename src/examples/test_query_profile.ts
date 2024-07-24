
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { Profile } from './profile_entity';
import { encryptWithAes } from '../crypto-ts/lib/aes_encryption';

// Example usage
const main = async () => {
	// Initialize the DataSource
	const dt = new DataSource({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'mysecretpassword',
		database: 'sandbox_nest',
		synchronize: true,
		entities: [Profile],
	});

	await dt.initialize();

	const user = new Profile();
    user.name = encryptWithAes('AES_256_CBC', 'Dyaksa Rahadia');
    user.email = encryptWithAes('AES_256_CBC','dyaksa.rahadian@gmail.com');
    user.address = encryptWithAes('AES_256_CBC','Demak Berung');
    user.age = 25;
    user.password = 'test_buf_aes';

    const saveToHeap = await CryptoTs.buildBlindIndex(dt, user);
	console.log('Insert With Heap :', saveToHeap);

};

main();

