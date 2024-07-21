"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLikeQuery = exports.searchContents = exports.isHashExist = exports.saveToHeap = exports.buildHeap = exports.updateWithHeap = exports.insertWithHeap = exports.validateEmail = exports.split = exports.generateSQLConditions = void 0;
require("reflect-metadata");
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
                args.push(value);
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);
                    const fieldValue = entity[key];
                    if (fieldValue && fieldValue.to) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = (0, exports.buildHeap)(fieldValue.to(), txtHeapTable);
                        th.push(...heaps);
                        args.push(str);
                    }
                    else {
                        args.push(null);
                    }
                }
                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }
    const query = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id`;
    return { query, args };
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
                args.push(value);
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);
                    const fieldValue = entity[key];
                    if (fieldValue && fieldValue.to) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = (0, exports.buildHeap)(fieldValue.to(), txtHeapTable);
                        th.push(...heaps);
                        args.push(str);
                    }
                }
                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }
    let query = `UPDATE ${tableName} SET `;
    for (let i = 0; i < fieldNames.length; i++) {
        query += `${fieldNames[i]} = ${placeholders[i]}, `;
    }
    query = query.slice(0, -2); // Remove last comma and space
    query += ` WHERE id = $${placeholders.length + 1}`;
    return { query, args: [...args, id] };
};
exports.updateWithHeap = updateWithHeap;
const buildHeap = (value, typeHeap) => {
    const values = (0, exports.split)(value);
    const builder = new Set();
    const heaps = [];
    const c = {
        hmacFunc: () => (value) => `hashed_${value}`
    };
    values.forEach(val => {
        const hash = c.hmacFunc()(val);
        builder.add(hash);
        heaps.push({ content: val.toLowerCase(), type: typeHeap, hash });
    });
    return { str: Array.from(builder).join(''), heaps };
};
exports.buildHeap = buildHeap;
const saveToHeap = (textHeaps) => {
    const queries = [];
    for (const th of textHeaps) {
        const query = `INSERT INTO ${th.type} (content, hash) VALUES ($1, $2) ON CONFLICT DO NOTHING`;
        queries.push({ query, args: [th.content, th.hash] });
    }
    return { query: queries.map(q => q.query).join('; '), args: queries.map(q => q.args) };
};
exports.saveToHeap = saveToHeap;
const isHashExist = (typeHeap, args) => {
    const query = `SELECT hash FROM ${typeHeap} WHERE hash = $1`;
    return { query, args: [args.hash] };
};
exports.isHashExist = isHashExist;
const searchContents = (table, args) => {
    const query = `SELECT content, hash FROM ${table} WHERE content ILIKE $1`;
    return { query, args: [`%${args.content}%`] };
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
