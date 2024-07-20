declare const _default: {
    encryptWithAes: (type: string, key: string, data: string | Buffer) => Buffer;
    decryptWithAes: (type: string, key: string, data: string | Buffer) => Buffer;
    commonGenerateDigest: (algorithm: string, key: Buffer | import("crypto").KeyObject, ...datas: (string | Buffer)[]) => string;
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
};
export default _default;
