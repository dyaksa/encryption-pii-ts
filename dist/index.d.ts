import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
declare const CryptoTs: {
    encryptWithAes: (type: string, data: string | Buffer) => Buffer;
    decryptWithAes: (type: string, data: string | Buffer) => Buffer;
    commonGenerateDigest: (algorithm: string, ...datas: (string | Buffer)[]) => string;
    insertWithHeap: (dt: import("typeorm").DataSource, tableName: string, entity: any) => Promise<any>;
    updateWithHeap: (dt: import("typeorm").DataSource, tableName: string, entity: any, id: string) => Promise<any>;
    saveToHeap: (dt: import("typeorm").DataSource, textHeaps: import("./crypto-ts/lib/types").TextHeap[]) => Promise<void>;
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
