export declare const parseNIK: (v: string) => {
    v: string;
};
export declare const getNIKValue: (nik: {
    v: string;
}) => string;
export declare const nikToString: (nik: {
    v: string;
}) => string;
export declare const nikToStringP: (nik: {
    v: string;
}) => string | null;
export declare const nikToSlice: (nik: {
    v: string;
}) => string[];
export declare const isValidNIK: (nik: string) => boolean;
