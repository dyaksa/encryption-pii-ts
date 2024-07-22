
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { User } from './entity';
import { CreateUserDto } from './createUser.dto';
import { UpdateUserDto } from './updateUser.dto';

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


	const updateUser = new UpdateUserDto();
    updateUser.name = 'Reka Alamsyah sadsadas paham'; // Update name to a new value
    updateUser.email = 'reka.alamsyah.updateasdasdsa@gmail.com'; // Update email to a new value
    updateUser.address = 'Cisereuh aseeemmm';
    updateUser.age = 30;
    updateUser.password = 'securepassword';

    const updateWithHeap = await CryptoTs.updateWithHeap(dt, tableName, updateUser, '4207c94f-4f08-4793-90fa-6b5ceacadf00');
    console.log('Update With Heap:', updateWithHeap);
};

main();

