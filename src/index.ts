import { decryptWithAes, encryptWithAes } from "./crypto-ts/lib/aes_encryption";
import { commonGenerateDigest } from "./crypto-ts/lib/hmac";
import { buildHeap, buildLikeQuery, generateSQLConditions, insertWithHeap, isHashExist, saveToHeap, searchContents, updateWithHeap } from "./crypto-ts/lib/query";

export default {
	encryptWithAes,
	decryptWithAes,
	commonGenerateDigest,
	insertWithHeap,
	updateWithHeap,
	saveToHeap,
	buildHeap,
	generateSQLConditions,
	buildLikeQuery,
	searchContents,
	isHashExist
}
