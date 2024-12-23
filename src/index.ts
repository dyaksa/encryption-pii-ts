import {
	decryptWithAes,
	encryptWithAes,
	hashString,
	toMask,
} from './crypto-ts/lib/aes_encryption';
import {
	BidxCol,
	DBColumn,
	TxtHeapTable,
	FullTextSearch,
} from './crypto-ts/lib/decorator';
import {
	buildBlindIndex,
	searchContentFullText,
	searchContents,
	split,
} from './crypto-ts/lib/query';
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
	searchContentFullText,
	split,
	hashString,
	toMask,
	AesCipher,
};

export default CryptoTs;
