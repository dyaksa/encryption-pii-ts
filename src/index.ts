import { decryptWithAes, encryptWithAes, encryptWithAesBuf} from "./crypto-ts/lib/aes_encryption";
import { BidxCol, DBColumn, TxtHeapTable } from "./crypto-ts/lib/decorator";
import { buildBlindIndex, searchContents, bindHeap } from "./crypto-ts/lib/query";
import { AesCipher } from "./crypto-ts/lib/types";


const CryptoTs = {
    DBColumn,
    BidxCol,
    TxtHeapTable,
    AesCipher,
    encryptWithAes,
    decryptWithAes,
	buildBlindIndex,
    bindHeap,
	searchContents,
    encryptWithAesBuf
};

export default CryptoTs;
