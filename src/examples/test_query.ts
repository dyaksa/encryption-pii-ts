
// index.ts
import { DataSource, Entity } from 'typeorm';
import CryptoTs from '../index';
import { User } from './entity';

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
    user.name = 'Dyaksa Rahadian';
    user.email = 'dyaksa.rahadian@gmail.com';
    user.address = 'Demak Berung';
    user.age = 25;
    user.password = 'securepassword';


    const saveToHeap = await CryptoTs.buildBlindIndex(dt, user);
	console.log('Insert With Heap :', saveToHeap);

};

main();

