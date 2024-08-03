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
// index.ts
const index_1 = require("../index");
const user_entity_1 = require("./entity/user_entity");
const aes_encryption_1 = require("../crypto-ts/lib/aes_encryption");
const config_1 = require("../crypto-ts/lib/config");
// Example usage
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const dt = yield (0, config_1.dt_conf)();
    const user = new user_entity_1.User();
    user.name = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'Mohamad Ali Farhan');
    user.email = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'ali.farhan@yopmail.com');
    user.address = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', 'address yang rahasia');
    user.phone = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', '0899361349');
    user.nik = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', '3215012506200007');
    user.npwp = (0, aes_encryption_1.encryptWithAes)('AES_256_CBC', '311501230697000');
    user.age = 25;
    user.password = 'securepassword';
    const blindIdx = yield index_1.default.buildBlindIndex(user);
    // Create an SQL query for insertion
    const query = `
        INSERT INTO "users" 
        (name, name_bidx, email, email_bidx, address, address_bidx, phone, phone_bidx, nik, nik_bidx, npwp, npwp_bidx, age, password) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;
    // Array of values corresponding to the placeholders in the query
    const values = [
        blindIdx.name, blindIdx.name_bidx,
        blindIdx.email, blindIdx.email_bidx,
        blindIdx.address, blindIdx.address_bidx,
        blindIdx.phone, blindIdx.phone_bidx,
        blindIdx.nik, blindIdx.nik_bidx,
        blindIdx.npwp, blindIdx.npwp_bidx,
        user.age, user.password
    ];
    yield dt.query(query, values);
    console.log('User has been saved:', user);
    yield dt.destroy();
});
main().catch((error) => console.log('Error:', error));
