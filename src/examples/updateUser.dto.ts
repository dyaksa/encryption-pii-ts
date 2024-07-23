import { v4 as uuidv4 } from 'uuid';
import CryptoTs from "../index";

export class UpdateUserDto {
    @CryptoTs.DBColumn('name')
    @CryptoTs.BidxCol('bidx_name')
    @CryptoTs.TxtHeapTable('name_text_heap')
    name: string | Buffer;

    @CryptoTs.DBColumn('email')
    @CryptoTs.BidxCol('bidx_email')
    @CryptoTs.TxtHeapTable('email_text_heap')    
    email: string | Buffer;
    
    @CryptoTs.DBColumn('address')
    @CryptoTs.BidxCol('bidx_address')
    @CryptoTs.TxtHeapTable('address_text_heap')
    address: string | Buffer;
    
	@CryptoTs.DBColumn('age')
    age: number;    
    
    @CryptoTs.DBColumn('password')
    password: string;

}