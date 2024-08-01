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
exports.isValidPhone = exports.phoneToSlice = exports.phoneToStringP = exports.phoneToString = exports.getPhoneValue = exports.parsePhone = void 0;
// phone.ts
const PHONE_REGEX = /^(?:\+?(\d{1,3}))?(\d{2})(\d{4,10})$/;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 12;
const parsePhone = (v) => {
    if (typeof v === 'string') {
        if (!(0, exports.isValidPhone)(v)) {
            throw new Error(`invalid data phone ${v}`);
        }
        return { v };
    }
    else {
        throw new Error(`invalid type ${typeof v}`);
    }
};
exports.parsePhone = parsePhone;
const getPhoneValue = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return phone.v;
});
exports.getPhoneValue = getPhoneValue;
const phoneToString = (phone) => {
    const validPhone = (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
    return validPhone.join('-');
};
exports.phoneToString = phoneToString;
const phoneToStringP = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const validPhone = (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
    return validPhone.length ? validPhone.join('-') : null;
});
exports.phoneToStringP = phoneToStringP;
const phoneToSlice = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    return (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
});
exports.phoneToSlice = phoneToSlice;
const isValidPhone = (phone) => {
    const cleanNumber = phone.replace(/[- ]/g, '');
    if (!PHONE_REGEX.test(cleanNumber))
        return false;
    const validPhone = (PHONE_REGEX.exec(numbersOnly(cleanNumber)) || []);
    if (!validPhone.length)
        return false;
    return correctLength(validPhone[0].length, PHONE_MIN_LENGTH, PHONE_MAX_LENGTH);
};
exports.isValidPhone = isValidPhone;
const numbersOnly = (v) => {
    return v.replace(/\D/g, '');
};
const correctLength = (length, minLength, maxLength) => {
    return length >= minLength && length <= maxLength;
};
