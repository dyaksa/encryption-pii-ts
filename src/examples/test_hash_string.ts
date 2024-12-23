import CryptoTs from '../index';

const data = 'TEST-PARTNER';

// hashString & to mask data string
console.log('email hash', CryptoTs.hashString(data));
console.log('to mask', CryptoTs.toMask(data));
