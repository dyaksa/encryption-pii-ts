
// index.ts
import CryptoTs from '../index';
import { Entity } from './entity';

// Example usage
const main = () => {
    const entity = new Entity();
    entity.id = '123e4567-e89b-12d3-a456-426614174000';
    entity.name = 'John Doe';
    entity.createdAt = new Date().toISOString();
    entity.age = 30;
    entity.score = 85.5;
    entity.isActive = true;
    entity.content = 'Example content';

	console.log(entity);

    const tableName = 'example_table';

    const { query: insertQuery, args: insertArgs } = CryptoTs.insertWithHeap(tableName, entity);
    console.log('Insert Query:', insertQuery);
    console.log('Insert Args:', insertArgs);

    const { query: updateQuery, args: updateArgs } = CryptoTs.updateWithHeap(tableName, entity, '123e4567-e89b-12d3-a456-426614174000');
    console.log('Update Query:', updateQuery);
    console.log('Update Args:', updateArgs);

    const textHeaps = [
        { content: 'example content', type: 'example_heap', hash: 'hashed_example' }
    ];
    const { query: heapQuery, args: heapArgs } = CryptoTs.saveToHeap(textHeaps);
    console.log('Heap Query:', heapQuery);
    console.log('Heap Args:', heapArgs);

    const terms = ['example', 'test'];
    const { query: likeQuery, args: likeArgs } = CryptoTs.buildLikeQuery('column_name', 'SELECT * FROM example_table', terms);
    console.log('Like Query:', likeQuery);
    console.log('Like Args:', likeArgs);

    const { query: searchQuery, args: searchArgs } = CryptoTs.searchContents('example_heap', { content: 'example' });
    console.log('Search Query:', searchQuery);
    console.log('Search Args:', searchArgs);

    const { query: hashExistQuery, args: hashExistArgs } = CryptoTs.isHashExist('example_heap', { hash: 'hashed_example' });
    console.log('Hash Exist Query:', hashExistQuery);
    console.log('Hash Exist Args:', hashExistArgs);

    const conditions = CryptoTs.generateSQLConditions(entity);
    console.log('SQL Conditions:', conditions.join(' AND '));
};

main();

