"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const data = 'TEST-PARTNER';
// Encrypt
const encryptedHex = index_1.default.encryptWithAes('AES_256_CBC', data);
console.log('Encrypted Data (Hex):', encryptedHex.Value.toString());
// // Decrypt
const decryptedData = index_1.default.decryptWithAes('AES_256_CBC', encryptedHex.Value);
console.log('Decrypt Data:', decryptedData);
