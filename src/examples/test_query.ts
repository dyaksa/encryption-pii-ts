
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { User } from './user_entity';
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
		entities: [User],
	});

	await dt.initialize();

	const user = new User();
    user.name = encryptWithAes('AES_256_CBC','Dyaksa Rahadian');
    user.email = encryptWithAes('AES_256_CBC','dyaksa.rahadian@gmail.com');
    user.address = encryptWithAes('AES_256_CBC', 'Demak Berung');
    user.age = 25;
    user.password = 'securepassword';

    const saveToHeap = await CryptoTs.buildBlindIndex(dt, user);
	console.log('Insert With Heap :', saveToHeap);

};

main();

