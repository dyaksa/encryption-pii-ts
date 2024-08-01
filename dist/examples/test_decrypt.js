"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// Decrypt
const decryptedData = index_1.default.decryptWithAes("AES_256_CBC", '1b8253f0b4a37b46bda5b5a0401b1eb3131eba40ef283b63e1243bd8b96f2a9d');
console.log('Decrypted Data:', decryptedData.toString());
