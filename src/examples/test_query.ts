
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { User } from './entity';
import { CreateUserDto } from './createUser.dto';

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

	const user = new CreateUserDto();
    // user.name = 'Reka Alamsyah';
    // user.email = 'reka.alamsyah@gmail.com';
    // user.address = 'Cisereuh Berung';
    // user.age = 30;
    // user.password = 'securepassword';

    const tableName = 'users';

    // const insertWithHeap = await CryptoTs.insertWithHeap(dt, tableName, user);
	// console.log('Insert With Heap:', insertWithHeap);


    user.name = 'Reka Alamsyah Updated'; // Update name to a new value
    user.email = 'reka.alamsyah.updated@gmail.com'; // Update email to a new value

    const updateWithHeap = await CryptoTs.updateWithHeap(dt, tableName, user, '3adba255-bc37-4bd1-b749-1a2315cbac87');
    console.log('Update With Heap:', updateWithHeap);
};

main();

