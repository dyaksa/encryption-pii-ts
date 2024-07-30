export declare const parsePhone: (v: string) => {
    v: string;
};
export declare const getPhoneValue: (phone: {
    v: string;
}) => Promise<string>;
export declare const phoneToString: (phone: {
    v: string;
}) => string;
export declare const phoneToStringP: (phone: {
    v: string;
}) => Promise<string | null>;
export declare const phoneToSlice: (phone: {
    v: string;
}) => Promise<string[]>;
export declare const isValidPhone: (phone: string) => boolean;
