
// index.ts
import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { Profile } from './profile_entity';
import { encryptWithAesBuf } from 'src/crypto-ts/lib/aes_encryption';

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

	
	const user = new Profile();
    user.name = encryptWithAesBuf('aes_256_cbc', 'Dyaksa Rahadia');
    user.email = encryptWithAesBuf('aes_256_cbc','dyaksa.rahadian@gmail.com');
    user.address = encryptWithAesBuf('aes_256_cbc','Demak Berung');
    user.age = 25;
    user.password = 'test_buf_aes';


    const saveToHeap = await CryptoTs.bindHeap(dt, user);
	console.log('Insert With Heap :', saveToHeap);

};

main();

