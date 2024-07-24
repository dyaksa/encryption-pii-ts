import { AesCipher } from '../crypto-ts/lib/types';
export declare class Profile {
    id: string;
    name: AesCipher;
    name_bidx: string;
    email: AesCipher;
    email_bidx: string;
    address: AesCipher;
    address_bidx: string;
    age: number | null;
    password: string;
}
