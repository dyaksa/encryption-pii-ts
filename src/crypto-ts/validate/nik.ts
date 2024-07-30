// nik.ts
const NIK_REGEX = /^(\d{2})(\d{2})(\d{2})(\d{6})(\d{4})$/;
const NIK_LENGTH = 16;

export const parseNIK =  (v: string): { v: string } => {
    if (typeof v === 'string') {
        if (!isValidNIK(v)) {
            throw new Error(`invalid data NIK ${v}`);
        }
        return { v };
    } else {
        throw new Error(`invalid type ${typeof v}`);
    }
};

export const getNIKValue = (nik: { v: string }): string => {
    return nik.v;
};

export const nikToString = (nik: { v: string }): string => {
    const validNik = (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
    return validNik.join('.');
};

export const nikToStringP = (nik: { v: string }): string | null => {
    const validNik = (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
    return validNik.length ? validNik.join('.') : null;
};

export const nikToSlice = (nik: { v: string }): string[] => {
    return (NIK_REGEX.exec(numbersOnly(nik.v)) || []).slice(1);
};

export const isValidNIK = (nik: string): boolean => {
	if (nik.length !== NIK_LENGTH) return false;
    if (!NIK_REGEX.test(nik)) return false;

    const validNik = (NIK_REGEX.exec(numbersOnly(nik)) || []);
	if (!validNik.length) return false;

    const cBirthday = reformatBirthday(validNik[4]);
	const formattedDate = formatDate(`19${cBirthday}`);
	return !!formattedDate;
};

const numbersOnly = (v: string): string => {
    return v.replace(/\D/g, '');
};

const formatDate = (dateStr: string): Date | null => {
    const date = new Date(dateStr);
	return isNaN(date.getTime()) ? null : date;
};

const reformatBirthday = (datePart: string): string => {
    if (datePart.length === 6) {
        const day = datePart.slice(0, 2);
        const month = datePart.slice(2, 4);
        const year = datePart.slice(4, 6);
        return `${year}-${month}-${day}`;
    }
    return '';
};
