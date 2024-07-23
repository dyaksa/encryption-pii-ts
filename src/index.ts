import { decryptWithAes, encryptWithAes } from "./crypto-ts/lib/aes_encryption";
import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
import { buildBlindIndex, searchContents } from "./crypto-ts/lib/query";


const CryptoTs = {
    encryptWithAes,
    decryptWithAes,
    DBColumn,
    BidxCol,
    TxtHeapTable,
	buildBlindIndex,
	searchContents,
};

export default CryptoTs;
