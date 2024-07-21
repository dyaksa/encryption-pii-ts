import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
declare const CryptoTs: {
    encryptWithAes: (type: string, data: string | Buffer) => Buffer;
    decryptWithAes: (type: string, data: string | Buffer) => Buffer;
    commonGenerateDigest: (algorithm: string, ...datas: (string | Buffer)[]) => string;
    insertWithHeap: (tableName: string, entity: any) => {
        query: string;
    };
    updateWithHeap: (tableName: string, entity: any, id: string) => {
        query: string;
    };
    saveToHeap: (textHeaps: import("./crypto-ts/lib/types").TextHeap[]) => {
        query: string;
    };
    buildHeap: (value: string, typeHeap: string) => {
        str: string;
        heaps: import("./crypto-ts/lib/types").TextHeap[];
    };
    generateSQLConditions: (data: any) => string[];
    buildLikeQuery: (column: string, baseQuery: string, terms: string[]) => {
        query: string;
        args: any[];
    };
    searchContents: (table: string, content: string) => {
        query: string;
    };
    isHashExist: (typeHeap: string, hash: string) => {
        query: string;
    };
    DBColumn: typeof DBColumn;
    BidxCol: typeof BidxCol;
    TxtHeapTable: typeof TxtHeapTable;
};
export default CryptoTs;
