import { FindTextHeapByContentParams, FindTextHeapRow, TextHeap } from './types';
import 'reflect-metadata';
export declare const split: (value: string) => string[];
export declare const getLast8Characters: (input: string) => string;
export declare const validateEmail: (email: string) => boolean;
export declare const buildHeap: (value: string, typeHeap: string) => {
    str: string;
    heaps: TextHeap[];
};
export declare const saveToHeap: (textHeaps: TextHeap[]) => Promise<void>;
export declare const searchContents: (table: string, args: FindTextHeapByContentParams) => Promise<FindTextHeapRow[]>;
export declare const buildBlindIndex: (entity: any) => Promise<any>;
