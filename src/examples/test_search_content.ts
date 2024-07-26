import { DataSource } from 'typeorm';
import CryptoTs from '../index';
import { User } from './user_entity';


async function exampleGetHeapsByContent() {
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

	try {
        const inputValue = "dian";
        const result = await CryptoTs.searchContents(dt, 'name_text_heap', {content: inputValue});
        console.log('Result:', result);
    } catch (error) {
        console.error('Error fetching heaps by content:', error);
    }
}

exampleGetHeapsByContent();
