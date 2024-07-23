"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aes_encryption_1 = require("./crypto-ts/lib/aes_encryption");
const decorator_1 = require("./crypto-ts/lib/decorator");
const query_1 = require("./crypto-ts/lib/query");
const CryptoTs = {
    encryptWithAes: aes_encryption_1.encryptWithAes,
    decryptWithAes: aes_encryption_1.decryptWithAes,
    DBColumn: decorator_1.DBColumn,
    BidxCol: decorator_1.BidxCol,
    TxtHeapTable: decorator_1.TxtHeapTable,
    buildBlindIndex: query_1.buildBlindIndex,
    searchContents: query_1.searchContents,
};
exports.default = CryptoTs;
