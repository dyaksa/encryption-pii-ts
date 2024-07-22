"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLikeQuery = exports.searchContents = exports.isHashExist = exports.saveToHeap = exports.buildHeap = exports.updateWithHeap = exports.insertWithHeap = exports.validateEmail = exports.getLast8Characters = exports.split = exports.generateSQLConditions = void 0;
const hmac_1 = require("./hmac");
require("reflect-metadata");
const dotenv = require("dotenv");
const aes_encryption_1 = require("./aes_encryption");
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
const insertWithHeap = (dt, tableName, entity) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldNames = [];
    const args = [];
    const placeholders = [];
    const th = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                let value = entity[key];
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    const encryptedValue = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', value);
                    args.push(encryptedValue);
                    placeholders.push(`$${args.length}`);
                }
                const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                if (txtHeapTable) {
                    const { str, heaps } = (0, exports.buildHeap)(value, txtHeapTable);
                    th.push(...heaps);
                    value = str;
                }
                args.push(value);
                placeholders.push(`$${args.length}`);
            }
        }
    }
    yield (0, exports.saveToHeap)(dt, th);
    const query = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id;`;
    const execQuery = yield dt.query(query, args);
    return execQuery;
});
exports.insertWithHeap = insertWithHeap;
const updateWithHeap = (dt, tableName, entity, id) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldNames = [];
    const placeholders = [];
    const args = [];
    const th = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                let value = entity[key];
                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    const encryptedValue = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', value);
                    args.push(encryptedValue);
                    placeholders.push(`$${args.length}`);
                }
                const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                if (txtHeapTable) {
                    const { str, heaps } = (0, exports.buildHeap)(value, txtHeapTable);
                    th.push(...heaps);
                    value = str;
                }
                args.push(value);
                placeholders.push(`$${args.length}`);
            }
        }
    }
    yield (0, exports.saveToHeap)(dt, th);
    const setClause = fieldNames.map((field, index) => `${field} = ${placeholders[index]}`).join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $${args.length + 1};`;
    args.push(id); // Tambahkan parameter ID di akhir
    console.log(query);
    const execQuery = yield dt.query(query, args);
    console.log(execQuery);
    return execQuery;
});
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
const saveToHeap = (dt, textHeaps) => __awaiter(void 0, void 0, void 0, function* () {
    yield dt.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        for (const th of textHeaps) {
            const existQuery = `SELECT 1 FROM ${th.type} WHERE hash = $1`;
            const existRes = yield entityManager.query(existQuery, [th.hash]);
            if (existRes.length === 0) {
                const insertQuery = `INSERT INTO ${th.type} (content, hash) VALUES ($1, $2) ON CONFLICT DO NOTHING`;
                yield entityManager.query(insertQuery, [th.content, th.hash]);
            }
        }
    }));
});
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
