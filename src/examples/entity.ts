// entity.ts
import CryptoTs from '../index';

export class Entity {
    @CryptoTs.DBColumn('id')
    id: string;

    @CryptoTs.DBColumn('name')
    name: string;

    @CryptoTs.DBColumn('created_at')
    createdAt: string;

    @CryptoTs.DBColumn('age')
    age: number;

    @CryptoTs.DBColumn('score')
    score: number;

    @CryptoTs.DBColumn('is_active')
    isActive: boolean;

    @CryptoTs.DBColumn('content')
    @CryptoTs.BidxCol('bidx_content')
    @CryptoTs.TxtHeapTable('example_heap')
    content: string;
}
