"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNPWP = exports.npwpToSlice = exports.npwpToStringP = exports.npwpToString = exports.getNPWPValue = exports.parseNPWP = void 0;
// npwp.ts
const NPWP_REGEX = /^(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})$/;
const NPWP_LENGTH = 15;
const NPWP_TAX_IDENTITIES = [
    "01", "02", "21", "31", "00", "20", "04", "05", "06", "07", "08", "09", "24", "25", "26",
    "31", "34", "35", "36", "41", "47", "42", "48", "49", "57", "58", "64", "65", "67", "71", "77", "78", "79", "87", "88",
    "89", "91", "97",
];
const parseNPWP = (v) => {
    if (typeof v === 'string') {
        if (!(0, exports.isValidNPWP)(v)) {
            throw new Error(`invalid data NPWP ${v}`);
        }
        return { v };
    }
    else {
        throw new Error(`invalid type ${typeof v}`);
    }
};
exports.parseNPWP = parseNPWP;
const getNPWPValue = (npwp) => {
    return npwp.v;
};
exports.getNPWPValue = getNPWPValue;
const npwpToString = (npwp) => {
    const validNpwp = (NPWP_REGEX.exec(numbersOnly(npwp.v)) || []).slice(1);
    return validNpwp.join('.');
};
exports.npwpToString = npwpToString;
const npwpToStringP = (npwp) => {
    const validNpwp = (NPWP_REGEX.exec(numbersOnly(npwp.v)) || []).slice(1);
    return validNpwp.length ? validNpwp.join('.') : null;
};
exports.npwpToStringP = npwpToStringP;
const npwpToSlice = (npwp) => {
    const cleanNpwp = numbersOnly(npwp.v);
    if (cleanNpwp.length !== NPWP_LENGTH) {
        return [];
    }
    // Format NPWP into segments 2-6-7
    return [cleanNpwp.slice(0, 2), cleanNpwp.slice(2, 8), cleanNpwp.slice(8, 15)];
};
exports.npwpToSlice = npwpToSlice;
const isValidNPWP = (npwp) => {
    if (npwp.length !== NPWP_LENGTH)
        return false;
    if (!NPWP_REGEX.test(npwp))
        return false;
    const validNpwp = (NPWP_REGEX.exec(numbersOnly(npwp)) || []);
    if (!validNpwp.length)
        return false;
    return isValidTaxIdentity(validNpwp[1]);
};
exports.isValidNPWP = isValidNPWP;
const numbersOnly = (v) => {
    return v.replace(/\D/g, '');
};
const isValidTaxIdentity = (taxIdentity) => {
    return NPWP_TAX_IDENTITIES.includes(taxIdentity);
};
