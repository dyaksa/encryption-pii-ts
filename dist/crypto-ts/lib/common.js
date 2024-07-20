"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferToString = exports.checkBuffer = void 0;
const buffer_1 = require("buffer");
/**
 * Convert buffer input to string
 * @param buffer {string | Buffer}
 * @return {string}
 */
const bufferToString = (buffer) => {
    if (buffer_1.Buffer.isBuffer(buffer)) {
        return buffer.toString();
    }
    return buffer;
};
exports.bufferToString = bufferToString;
/**
 * Check if input is valid buffer
 * @param buffer {Buffer}
 * @return {void | Error}
 */
const checkBuffer = (buffer) => {
    if (!buffer_1.Buffer.isBuffer(buffer)) {
        throw new Error('data param should be buffer');
    }
};
exports.checkBuffer = checkBuffer;
