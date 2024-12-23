import { decryptWithAes, encryptWithAes } from './crypto-ts/lib/aes_encryption';
import {
	BidxCol,
	DBColumn,
	TxtHeapTable,
	FullTextSearch,
} from './crypto-ts/lib/decorator';
import { buildBlindIndex, searchContents } from './crypto-ts/lib/query';
import { AesCipher } from './crypto-ts/lib/types';

const CryptoTs = {
	DBColumn,
	BidxCol,
	TxtHeapTable,
	FullTextSearch,
	encryptWithAes,
	decryptWithAes,
	buildBlindIndex,
	searchContents,
	AesCipher,
};

export default CryptoTs;
