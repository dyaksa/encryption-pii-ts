
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
    user.name = 'Khairul Rahadian';
    user.email = 'rahadian.khairul@gmail.com';
    user.address = 'Bandung Barat';
    user.age = 30;
    user.password = 'securepassword';

    const tableName = 'users';

    const insertWithHeap = await CryptoTs.insertWithHeap(dt, tableName, user);
	console.log('Insert With Heap:', insertWithHeap);

    // const updateWithHea = CryptoTs.updateWithHeap(tableName, entity, '123e4567-e89b-12d3-a456-426614174000');
    // console.log('Update With Heap', updateWithHea.query);

    // const textHeaps = [
    //     { content: 'example content', type: 'example_heap', hash: 'hashed_example' }
    // ];
    // const { query: heapQuery, args: heapArgs } = CryptoTs.saveToHeap(textHeaps);
    // console.log('Heap Query:', heapQuery);
    // console.log('Heap Args:', heapArgs);

    // const terms = ['example', 'test'];
    // const { query: likeQuery, args: likeArgs } = CryptoTs.buildLikeQuery('column_name', 'SELECT * FROM example_table', terms);
    // console.log('Like Query:', likeQuery);
    // console.log('Like Args:', likeArgs);

    // const searchContents = CryptoTs.searchContents('example_heap', 'example');
    // console.log('Search Content:', searchContents.query);

    // const { query: hashExistQuery, args: hashExistArgs } = CryptoTs.isHashExist('example_heap', { hash: 'hashed_example' });
    // console.log('Hash Exist Query:', hashExistQuery);
    // console.log('Hash Exist Args:', hashExistArgs);

    // const conditions = CryptoTs.generateSQLConditions(entity);
    // console.log('SQL Conditions:', conditions.join(' AND '));
};

main();

