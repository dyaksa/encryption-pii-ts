// entity.ts
import { AesCipher } from '../crypto-ts/lib/types';
import CryptoTs from '../index';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @CryptoTs.DBColumn('id')
    id: string;

    @Column('bytea')
    @CryptoTs.DBColumn('name')
    @CryptoTs.BidxCol('name_bidx')
    @CryptoTs.TxtHeapTable('name_text_heap')
    name: Buffer;

    @Column()
    name_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('email')
    @CryptoTs.BidxCol('email_bidx')
    @CryptoTs.TxtHeapTable('email_text_heap')
    email: Buffer;

    @Column()
    email_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('address')
    @CryptoTs.BidxCol('address_bidx')
    @CryptoTs.TxtHeapTable('address_text_heap')
    address: Buffer;

    @Column()
    address_bidx: string;

    @Column({ type: 'int', nullable: true, default: 25 }) // Define 'age' column as nullable
    @CryptoTs.DBColumn('age')
    age: number | null; // Adjust the type to accept null values

    @Column()
    @CryptoTs.DBColumn('password')
    password: string;
}
