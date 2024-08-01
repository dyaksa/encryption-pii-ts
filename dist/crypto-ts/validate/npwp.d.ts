export declare const parseNPWP: (v: string) => {
    v: string;
};
export declare const getNPWPValue: (npwp: {
    v: string;
}) => string;
export declare const npwpToString: (npwp: {
    v: string;
}) => string;
export declare const npwpToStringP: (npwp: {
    v: string;
}) => string | null;
export declare const npwpToSlice: (npwp: {
    v: string;
}) => string[];
export declare const isValidNPWP: (npwp: string) => boolean;
