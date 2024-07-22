// entity.ts
import CryptoTs from '../index';

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @CryptoTs.DBColumn('id')
        id: string;

    @Column('bytea')
    @CryptoTs.DBColumn('name')
    @CryptoTs.BidxCol('bidx_name')
    @CryptoTs.TxtHeapTable('name_text_heap')
        name: Buffer;

    @Column()
    @CryptoTs.DBColumn('email')
    @CryptoTs.BidxCol('bidx_email')
    @CryptoTs.TxtHeapTable('email_text_heap')    
        bidx_name: string;

    @Column('bytea')
    @CryptoTs.DBColumn('address')
    @CryptoTs.BidxCol('bidx_address')
    @CryptoTs.TxtHeapTable('address_text_heap')
        email: Buffer;

    @Column()
        bidx_email: string;

    @Column('bytea')
        address: Buffer;
    
    @Column()
        bidx_address: string;

    @Column({ type: 'int', nullable: true,  default: 25  }) // Define 'age' column as nullable
    @CryptoTs.DBColumn('age')
        age: number | null; // Adjust the type to accept null values
    
    @Column()
    @CryptoTs.DBColumn('password')
        password: string;
}
