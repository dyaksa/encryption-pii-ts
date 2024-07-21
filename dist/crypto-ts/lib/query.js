"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLikeQuery = exports.searchContents = exports.isHashExist = exports.saveToHeap = exports.buildHeap = exports.updateWithHeap = exports.insertWithHeap = exports.validateEmail = exports.getLast8Characters = exports.split = exports.generateSQLConditions = void 0;
const hmac_1 = require("./hmac");
require("reflect-metadata");
const dotenv = require("dotenv");
dotenv.config();
const getMetadata = (entity, key, metaKey) => {
    return Reflect.getMetadata(metaKey, entity, key);
};
const generateSQLConditions = (data) => {
    const conditions = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            const bidxCol = getMetadata(data, key, 'bidx_col');
            if (bidxCol) {
                conditions.push(`${bidxCol} ILIKE '%${value}%'`);
            }
        }
    }
    return conditions;
};
exports.generateSQLConditions = generateSQLConditions;
const split = (value) => {
    let sep = ' ';
    const reg = '[a-zA-Z0-9]+';
    const regex = new RegExp(reg, 'g');
    if ((0, exports.validateEmail)(value)) {
        sep = '@';
    }
    const parts = value.split(sep);
    return parts.flatMap(part => part.match(regex) || []);
};
exports.split = split;
const getLast8Characters = (input) => {
    if (input.length <= 8) {
        return input;
    }
    return input.slice(-8);
};
exports.getLast8Characters = getLast8Characters;
const validateEmail = (email) => {
    const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexPattern.test(email);
};
exports.validateEmail = validateEmail;
const insertWithHeap = (tableName, entity) => {
    const fieldNames = [];
    const args = [];
    const placeholders = [];
    const th = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                const value = entity[key];
                args.push(`'${value}'`);
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);
                    const fieldValue = entity[key];
                    if (fieldValue) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = (0, exports.buildHeap)(fieldValue, txtHeapTable);
                        th.push(...heaps);
                        args.push(`'${str}'`);
                    }
                }
                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }
    const saveHeap = (0, exports.saveToHeap)(th);
    const query = `
		INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${args}) RETURNING id;
		${saveHeap.query}
	`;
    return { query };
};
exports.insertWithHeap = insertWithHeap;
const updateWithHeap = (tableName, entity, id) => {
    const fieldNames = [];
    const placeholders = [];
    const args = [];
    const th = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                const value = entity[key];
                args.push(`'${value}'`);
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);
                    const fieldValue = entity[key];
                    if (fieldValue) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = (0, exports.buildHeap)(fieldValue, txtHeapTable);
                        th.push(...heaps);
                        args.push(`'${str}'`);
                    }
                }
                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }
    const saveHeap = (0, exports.saveToHeap)(th);
    let query = `UPDATE ${tableName} SET `;
    for (let i = 0; i < fieldNames.length; i++) {
        query += `${fieldNames[i]} = ${args[i]}, `;
    }
    query = query.slice(0, -2); // Remove last comma and space
    query += ` 
		WHERE id = '${id}'; 
		${saveHeap.query}
	`;
    return { query };
};
exports.updateWithHeap = updateWithHeap;
const buildHeap = (value, typeHeap) => {
    const values = (0, exports.split)(value);
    const builder = new Set();
    const heaps = [];
    values.forEach(val => {
        const hash = (0, hmac_1.commonGenerateDigest)('SHA256', val);
        const hash8LastChar = (0, exports.getLast8Characters)(hash);
        builder.add(hash8LastChar);
        heaps.push({ content: val.toLowerCase(), type: typeHeap, hash: hash8LastChar });
    });
    return { str: Array.from(builder).join(''), heaps };
};
exports.buildHeap = buildHeap;
const saveToHeap = (textHeaps) => {
    let combinedQuery = '';
    for (const th of textHeaps) {
        const existQuery = `SELECT 1 FROM ${th.type} WHERE hash = '${th.hash}'`;
        const insertQuery = `INSERT INTO ${th.type} (content, hash) VALUES ('${th.content}', '${th.hash}') ON CONFLICT DO NOTHING`;
        combinedQuery += `DO $$
							BEGIN
								IF NOT EXISTS (${existQuery}) THEN
									${insertQuery};
								END IF;
							END $$; `;
    }
    return { query: combinedQuery.trim().replace(/;$/, '') };
};
exports.saveToHeap = saveToHeap;
const isHashExist = (typeHeap, hash) => {
    const query = `SELECT hash FROM ${typeHeap} WHERE hash = '${hash}'`;
    return { query };
};
exports.isHashExist = isHashExist;
const searchContents = (table, content) => {
    const query = `SELECT content, hash FROM ${table} WHERE content ILIKE '%' || '${content}' || '%';`;
    return { query };
};
exports.searchContents = searchContents;
const buildLikeQuery = (column, baseQuery, terms) => {
    const likeClauses = [];
    const args = [];
    terms.forEach(term => {
        likeClauses.push(`${column} ILIKE $${args.length + 1}`);
        args.push(`%${term}%`);
    });
    const fullQuery = `${baseQuery} WHERE ${likeClauses.join(' OR ')}`;
    return { query: fullQuery, args };
};
exports.buildLikeQuery = buildLikeQuery;
