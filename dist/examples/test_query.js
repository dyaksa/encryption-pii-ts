"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const index_1 = require("../index");
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
    const tableName = 'example_table';
    const insertWithHeap = index_1.default.insertWithHeap(tableName, entity);
    console.log('Insert With Heap:', insertWithHeap.query);
    const updateWithHea = index_1.default.updateWithHeap(tableName, entity, '123e4567-e89b-12d3-a456-426614174000');
    console.log('Update With Heap', updateWithHea.query);
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
    const searchContents = index_1.default.searchContents('example_heap', 'example');
    console.log('Search Content:', searchContents.query);
    // const { query: hashExistQuery, args: hashExistArgs } = CryptoTs.isHashExist('example_heap', { hash: 'hashed_example' });
    // console.log('Hash Exist Query:', hashExistQuery);
    // console.log('Hash Exist Args:', hashExistArgs);
    // const conditions = CryptoTs.generateSQLConditions(entity);
    // console.log('SQL Conditions:', conditions.join(' AND '));
};
main();
