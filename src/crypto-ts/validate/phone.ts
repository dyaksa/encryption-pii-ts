// phone.ts
const PHONE_REGEX = /^(?:\+?(\d{1,3}))?(\d{2})(\d{4,10})$/;
const PHONE_MIN_LENGTH = 10;
const PHONE_MAX_LENGTH = 12;

export const parsePhone = (v: string): { v: string }=> {
    if (typeof v === 'string') {
        if (!isValidPhone(v)) {
            throw new Error(`invalid data phone ${v}`);
        }
        return { v };
    } else {
        throw new Error(`invalid type ${typeof v}`);
    }
};

export const getPhoneValue = async (phone: { v: string }): Promise<string> => {
    return phone.v;
};

export const phoneToString =  (phone: { v: string }): string => {
    const validPhone = (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
    return validPhone.join('-');
};

export const phoneToStringP = async (phone: { v: string }): Promise<string | null> => {
    const validPhone = (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
    return validPhone.length ? validPhone.join('-') : null;
};

export const phoneToSlice = async (phone: { v: string }): Promise<string[]> => {
    return (PHONE_REGEX.exec(numbersOnly(phone.v)) || []).slice(1);
};

export const isValidPhone = (phone: string): boolean => {
    const cleanNumber = phone.replace(/[- ]/g, '');

    if (!PHONE_REGEX.test(cleanNumber)) return false;

    const validPhone = (PHONE_REGEX.exec(numbersOnly(cleanNumber)) || []);
    if (!validPhone.length) return false;

    return correctLength(validPhone[0].length, PHONE_MIN_LENGTH, PHONE_MAX_LENGTH);
};

const numbersOnly = (v: string): string => {
    return v.replace(/\D/g, '');
};

const correctLength = (length: number, minLength: number, maxLength: number): boolean => {
    return length >= minLength && length <= maxLength;
};
