import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
import { AesCipher } from "./crypto-ts/lib/types";
declare const CryptoTs: {
    DBColumn: typeof DBColumn;
    BidxCol: typeof BidxCol;
    TxtHeapTable: typeof TxtHeapTable;
    encryptWithAes: (type: string, data: string | Buffer) => AesCipher;
    decryptWithAes: (type: string, data: string | Buffer) => string;
    buildBlindIndex: (dt: import("typeorm").DataSource, entity: any) => Promise<any>;
    searchContents: (value: string) => Promise<any>;
    AesCipher: typeof AesCipher;
};
export default CryptoTs;
