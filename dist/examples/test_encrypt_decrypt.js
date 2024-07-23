"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const data = "Dyaksa";
// Encrypt
const encryptedHex = index_1.default.encryptWithAes("AES_256_CBC", data);
console.log('Encrypted Data (Hex):', encryptedHex);
// Convert encrypted data to Buffer
const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
console.log('Encrypted Data (Buffer):', encryptedBuffer);
// Convert Buffer back to Hex
const hexFromBuffer = encryptedBuffer.toString('hex');
console.log('Encrypted Data (Hex):', hexFromBuffer);
// Decrypt
const decryptedData = index_1.default.decryptWithAes("AES_256_CBC", hexFromBuffer);
console.log('Encrypted Data (Hex):', decryptedData);
