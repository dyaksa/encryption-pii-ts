"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const index_1 = require("./index");
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
    const { query: insertQuery, args: insertArgs } = index_1.default.insertWithHeap(crypto, tableName, entity);
    console.log('Insert Query:', insertQuery);
    console.log('Insert Args:', insertArgs);
    const { query: updateQuery, args: updateArgs } = index_1.default.updateWithHeap(crypto, tableName, entity, '123e4567-e89b-12d3-a456-426614174000');
    console.log('Update Query:', updateQuery);
    console.log('Update Args:', updateArgs);
    const textHeaps = [
        { content: 'example content', type: 'example_heap', hash: 'hashed_example' }
    ];
    const { query: heapQuery, args: heapArgs } = index_1.default.saveToHeap(textHeaps);
    console.log('Heap Query:', heapQuery);
    console.log('Heap Args:', heapArgs);
    const terms = ['example', 'test'];
    const { query: likeQuery, args: likeArgs } = index_1.default.buildLikeQuery('column_name', 'SELECT * FROM example_table', terms);
    console.log('Like Query:', likeQuery);
    console.log('Like Args:', likeArgs);
    const { query: searchQuery, args: searchArgs } = index_1.default.searchContents('example_heap', { content: 'example' });
    console.log('Search Query:', searchQuery);
    console.log('Search Args:', searchArgs);
    const { query: hashExistQuery, args: hashExistArgs } = index_1.default.isHashExist('example_heap', { hash: 'hashed_example' });
    console.log('Hash Exist Query:', hashExistQuery);
    console.log('Hash Exist Args:', hashExistArgs);
    const conditions = index_1.default.generateSQLConditions(entity);
    console.log('SQL Conditions:', conditions.join(' AND '));
};
main();
// import CryptoTs from "./index";
// const data = "Dyaksa";
// // Encrypt
// const encryptData = CryptoTs.encryptWithAes("AES_256_CBC", data);
// console.log('Encrypted Data:', encryptData);
// // Decrypt
// const decryptedData = CryptoTs.decryptWithAes("AES_256_CBC", '1b8253f0b4a37b46bda5b5a0401b1eb3131eba40ef283b63e1243bd8b96f2a9d');
// console.log('Decrypted Data:', decryptedData.toString());
