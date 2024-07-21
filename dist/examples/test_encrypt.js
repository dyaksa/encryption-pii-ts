"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const data = "Dyaksa";
// Encrypt
const encryptData = index_1.default.encryptWithAes("AES_256_CBC", data);
console.log('Encrypted Data:', encryptData);
