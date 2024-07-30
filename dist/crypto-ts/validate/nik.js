"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNIK = exports.nikToSlice = exports.nikToStringP = exports.nikToString = exports.getNIKValue = exports.parseNIK = void 0;
// nik.ts
const NIK_REGEX = /^(\d{2})(\d{2})(\d{2})(\d{6})(\d{4})$/;
const NIK_LENGTH = 16;
const parseNIK = (v) => {
    if (typeof v === 'string') {
        if (!(0, exports.isValidNIK)(v)) {
            throw new Error(`invalid data NIK ${v}`);
        }
        return { v };
    }
    else {
        throw new Error(`invalid type ${typeof v}`);
    }
};
exports.parseNIK = parseNIK;
const getNIKValue = (nik) => {
    return nik.v;
};
exports.getNIKValue = getNIKValue;
const nikToString = (nik) => {
    const validNik = (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
    return validNik.join('.');
};
exports.nikToString = nikToString;
const nikToStringP = (nik) => {
    const validNik = (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
    return validNik.length ? validNik.join('.') : null;
};
exports.nikToStringP = nikToStringP;
const nikToSlice = (nik) => {
    return (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
};
exports.nikToSlice = nikToSlice;
const isValidNIK = (nik) => {
    if (nik.length !== NIK_LENGTH)
        return false;
    if (!NIK_REGEX.test(nik))
        return false;
    const validNik = (NIK_REGEX.exec(numbersOnly(nik)) || []);
    if (!validNik.length)
        return false;
    const cBirthday = reformatBirthday(validNik[4]);
    const formattedDate = formatDate(`19${cBirthday}`);
    return !!formattedDate;
};
exports.isValidNIK = isValidNIK;
const numbersOnly = (v) => {
    return v.replace(/\D/g, '');
};
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
};
const reformatBirthday = (datePart) => {
    if (datePart.length === 6) {
        const day = datePart.slice(0, 2);
        const month = datePart.slice(2, 4);
        const year = datePart.slice(4, 6);
        return `${year}-${month}-${day}`;
    }
    return '';
};
