
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

	// const user = new CreateUserDto();
    // user.name = 'Khairul Rahadian';
    // user.email = 'khairul.rahadian@gmail.com';
    // user.address = 'Ujung Berung';
    // user.age = 25;
    // user.password = 'securepassword';

    // const tableName = 'users';

	// console.log(user);
    // const insertWithHeap = await CryptoTs.insertWithHeap(dt, tableName, user);
	// console.log('Insert With Heap:', insertWithHeap);


	// const updateUser = new UpdateUserDto();
    // updateUser.name = 'Reka Alamsyah sadsadas paham'; // Update name to a new value
    // updateUser.email = 'reka.alamsyah.updateasdasdsa@gmail.com'; // Update email to a new value
    // updateUser.address = 'Cisereuh aseeemmm';
    // updateUser.age = 30;
    // updateUser.password = 'securepassword';

    // const updateWithHeap = await CryptoTs.updateWithHeap(dt, tableName, updateUser, '4207c94f-4f08-4793-90fa-6b5ceacadf00');
    // console.log('Update With Heap:', updateWithHeap);

	
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

