import { decryptWithAes, encryptWithAes } from "./crypto-ts/lib/aes_encryption";
import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
import { commonGenerateDigest } from "./crypto-ts/lib/hmac";
import { buildHeap, buildLikeQuery, generateSQLConditions, insertWithHeap, isHashExist, saveToHeap, searchContents, updateWithHeap } from "./crypto-ts/lib/query";


const CryptoTs = {
    encryptWithAes,
    decryptWithAes,
    commonGenerateDigest,
    insertWithHeap,
    updateWithHeap,
    saveToHeap,
    buildHeap,
    generateSQLConditions,
    buildLikeQuery,
    searchContents,
    isHashExist,
    DBColumn,
    BidxCol,
    TxtHeapTable
};

export default CryptoTs;
