"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const query_1 = require("./lib/query");
const entity_1 = require("./entity");
// Example usage
const main = () => {
    const entity = new entity_1.Entity();
    entity.id = '123e4567-e89b-12d3-a456-426614174000';
    entity.name = 'John Doe';
    entity.createdAt = new Date().toISOString();
    entity.age = 30;
    entity.score = 85.5;
    entity.isActive = true;
    entity.content = 'Example content';
    const crypto = {
        hmacFunc: () => (value) => `hashed_${value}`
    };
    const tableName = 'example_table';
    const { query: insertQuery, args: insertArgs } = (0, query_1.insertWithHeap)(crypto, tableName, entity);
    console.log('Insert Query:', insertQuery);
    console.log('Insert Args:', insertArgs);
    const { query: updateQuery, args: updateArgs } = (0, query_1.updateWithHeap)(crypto, tableName, entity, '123e4567-e89b-12d3-a456-426614174000');
    console.log('Update Query:', updateQuery);
    console.log('Update Args:', updateArgs);
    const textHeaps = [
        { content: 'example content', type: 'example_heap', hash: 'hashed_example' }
    ];
    const { query: heapQuery, args: heapArgs } = (0, query_1.saveToHeap)(textHeaps);
    console.log('Heap Query:', heapQuery);
    console.log('Heap Args:', heapArgs);
    const terms = ['example', 'test'];
    const { query: likeQuery, args: likeArgs } = (0, query_1.buildLikeQuery)('column_name', 'SELECT * FROM example_table', terms);
    console.log('Like Query:', likeQuery);
    console.log('Like Args:', likeArgs);
    const { query: searchQuery, args: searchArgs } = (0, query_1.searchContents)('example_heap', { content: 'example' });
    console.log('Search Query:', searchQuery);
    console.log('Search Args:', searchArgs);
    const { query: hashExistQuery, args: hashExistArgs } = (0, query_1.isHashExist)('example_heap', { hash: 'hashed_example' });
    console.log('Hash Exist Query:', hashExistQuery);
    console.log('Hash Exist Args:', hashExistArgs);
    const conditions = (0, query_1.generateSQLConditions)(entity);
    console.log('SQL Conditions:', conditions.join(' AND '));
};
main();
