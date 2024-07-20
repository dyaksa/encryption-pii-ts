// entity.ts
import { DBColumn, BidxCol, TxtHeapTable } from './decorator';

export class Entity {
    @DBColumn('id')
    id: string;

    @DBColumn('name')
    name: string;

    @DBColumn('created_at')
    createdAt: string;

    @DBColumn('age')
    age: number;

    @DBColumn('score')
    score: number;

    @DBColumn('is_active')
    isActive: boolean;

    @DBColumn('content')
    @BidxCol('bidx_content')
    @TxtHeapTable('example_heap')
    content: string;
}
