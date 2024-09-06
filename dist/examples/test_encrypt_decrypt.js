"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const data = 'Mohamad Ali Farhan';
// Encrypt
const encryptedHex = index_1.default.encryptWithAes('AES_256_CBC', data);
console.log('Encrypted Data (Hex):', encryptedHex);
// Decrypt
const decryptedData = index_1.default.decryptWithAes('AES_256_CBC', Buffer.from('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmMzNlOGVmNDgyYmU0NTUyZDYzNzNjNTU4NjY4ZmIyZDExY2VkM2ZkYzMxNzVmYTI1YzVkMGFiODQ3ZTc3ZjhkNDY2YjYyNTRlYWNkYWI0ODliMmJkNGRlMjVkNWU4OGM5NTU2YzhkMjEzNTE4NTExMmE0ZGFmM2Q0M2I0ODQyNmMxNzRjNTY2NDhiZmQ4ZjA2YzE3ZjhiMjU2ZWE3MGM0IiwiaWF0IjoxNzI1NTIzNzU5LCJleHAiOjE3MjU1MjQ2NTl9.8LIaly4XTXFPGa1NhKEq-M2xnfK_iB-ol8l53w4i_vU'));
console.log('Decrypt Data:', decryptedData);
