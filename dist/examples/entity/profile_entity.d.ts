import { AesCipher } from '../../crypto-ts/lib/types';
export declare class Profile {
    id: string;
    name: AesCipher;
    name_bidx: string;
    email: AesCipher;
    email_bidx: string;
    phone: Buffer;
    phone_bidx: string;
}
