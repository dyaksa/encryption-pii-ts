import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
declare const CryptoTs: {
    encryptWithAes: (type: string, data: string | Buffer) => Buffer;
    decryptWithAes: (type: string, data: string | Buffer) => string;
    DBColumn: typeof DBColumn;
    BidxCol: typeof BidxCol;
    TxtHeapTable: typeof TxtHeapTable;
    buildBlindIndex: (dt: import("typeorm").DataSource, entity: any) => Promise<any>;
    searchContents: (value: string) => Promise<any>;
};
export default CryptoTs;
