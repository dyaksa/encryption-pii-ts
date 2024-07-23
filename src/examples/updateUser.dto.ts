import { v4 as uuidv4 } from 'uuid';
import CryptoTs from "../index";

export class UpdateUserDto {
    name: string;
    email: string;
    address: string;
    age: number;    
    password: string;

}