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
const config_1 = require("../crypto-ts/lib/config");
// const main = async () => {
// 	const dt = await dt_conf();
// 	const query = `SELECT recipient_wa_number FROM ba_activations WHERE id='ffe66b84-dcfb-4b7f-9fa8-cf4e27c42249'`;
// 	const result = await dt.query(query);
// 	console.log("fetch Data",result[0].recipient_wa_number);
// 	// Decrypt
// 	const decryptedData = CryptoTs.decryptWithAes(
// 		'AES_256_CBC',
// 		result[0].recipient_wa_number,
// 	);
// 	console.log('Decrypt Data:', decryptedData);
// 	await dt.destroy();
// };
// const main = async () => {
// 	const dt = await dt_conf();
// 	const query = `SELECT name FROM users WHERE id='38d8135e-eddf-4812-bf13-46033e5fd080'`;
// 	const result = await dt.query(query);
// 	console.log(result[0].name);
// 	// Decrypt
// 	const decryptedData = CryptoTs.decryptWithAes(
// 		'AES_256_CBC',
// 		result[0].name,
// 	);
// 	console.log('Decrypt Data:', decryptedData);
// 	await dt.destroy();
// };
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const dt = yield (0, config_1.dt_conf)();
    const query = `SELECT name, email, phone FROM profile WHERE id='d1f02684-de64-4ccf-929f-71e463fc4729'`;
    const result = yield dt.query(query);
    // Decrypt
    const name = index_1.default.decryptWithAes('AES_256_CBC', result[0].name);
    const email = index_1.default.decryptWithAes('AES_256_CBC', result[0].email);
    const phone = index_1.default.decryptWithAes('AES_256_CBC', result[0].phone);
    console.log('Name Data:', name);
    console.log('Email Data:', email);
    console.log('Phone Data:', phone);
    yield dt.destroy();
});
main().catch((error) => console.log('Error:', error));
