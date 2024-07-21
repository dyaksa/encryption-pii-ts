import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
declare const _default: {
    encryptWithAes: (type: string, data: string | Buffer) => Buffer;
    decryptWithAes: (type: string, data: string | Buffer) => Buffer;
    commonGenerateDigest: (algorithm: string, ...datas: (string | Buffer)[]) => string;
    insertWithHeap: <T>(c: import("./crypto-ts/lib/types").Crypto, tableName: string, entity: any) => {
        query: string;
        args: any[];
    };
    updateWithHeap: (c: import("./crypto-ts/lib/types").Crypto, tableName: string, entity: any, id: string) => {
        query: string;
        args: any[];
    };
    saveToHeap: (textHeaps: import("./crypto-ts/lib/types").TextHeap[]) => {
        query: string;
        args: any[][];
    };
    buildHeap: (c: import("./crypto-ts/lib/types").Crypto, value: string, typeHeap: string) => {
        str: string;
        heaps: import("./crypto-ts/lib/types").TextHeap[];
    };
    generateSQLConditions: (data: any) => string[];
    buildLikeQuery: (column: string, baseQuery: string, terms: string[]) => {
        query: string;
        args: any[];
    };
    searchContents: (table: string, args: import("./crypto-ts/lib/types").FindTextHeapByContentParams) => {
        query: string;
        args: any[];
    };
    isHashExist: (typeHeap: string, args: import("./crypto-ts/lib/types").FindTextHeapByHashParams) => {
        query: string;
        args: any[];
    };
    DBColumn: typeof DBColumn;
    BidxCol: typeof BidxCol;
    TxtHeapTable: typeof TxtHeapTable;
};
export default _default;
