import { FindTextHeapByContentParams, FindTextHeapRow, TextHeap } from './types';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
export declare const split: (value: string) => string[];
export declare const getLast8Characters: (input: string) => string;
export declare const validateEmail: (email: string) => boolean;
export declare const buildHeap: (value: string, typeHeap: string) => {
    str: string;
    heaps: TextHeap[];
};
export declare const saveToHeap: (dt: DataSource, textHeaps: TextHeap[]) => Promise<void>;
export declare const searchContents: (datasource: DataSource, table: string, args: FindTextHeapByContentParams) => Promise<FindTextHeapRow[]>;
export declare const buildBlindIndex: (dt: DataSource, entity: any) => Promise<any>;
