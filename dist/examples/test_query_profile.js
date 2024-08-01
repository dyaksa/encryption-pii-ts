"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const profile_entity_1 = require("./entity/profile_entity");
const aes_encryption_1 = require("../crypto-ts/lib/aes_encryption");
// Example usage
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = new profile_entity_1.Profile();
    user.name = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'Dyaksa Rahadia');
    user.email = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'dyaksa.rahadian@gmail.com');
    user.address = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'Demak Berung');
    user.age = 25;
    user.password = 'test_buf_aes';
    const saveToHeap = yield index_1.default.buildBlindIndex(user);
    console.log('Insert With Heap :', saveToHeap);
});
main();
