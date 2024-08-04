// entity.ts
import { AesCipher } from '../../crypto-ts/lib/types';
import CryptoTs from '../../index';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    @CryptoTs.DBColumn('id')
    id: string;

    @Column('bytea')
    @CryptoTs.DBColumn('name')
    @CryptoTs.BidxCol('name_bidx')
    @CryptoTs.TxtHeapTable('name_text_heap')
    name: AesCipher

    @Column()
    name_bidx: string;

    @Column('bytea')
    @CryptoTs.DBColumn('email')
    @CryptoTs.BidxCol('email_bidx')
    @CryptoTs.TxtHeapTable('email_text_heap')
    email: AesCipher;

    @Column()
    email_bidx: string;


	@Column('bytea')
    @CryptoTs.DBColumn('phone')
    @CryptoTs.BidxCol('phone_bidx')
    @CryptoTs.TxtHeapTable('phone_text_heap')
    phone: Buffer;

    @Column()
    phone_bidx: string;
}

