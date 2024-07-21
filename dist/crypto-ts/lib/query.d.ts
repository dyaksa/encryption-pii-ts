import { TextHeap } from './types';
import 'reflect-metadata';
export declare const generateSQLConditions: (data: any) => string[];
export declare const split: (value: string) => string[];
export declare const getLast8Characters: (input: string) => string;
export declare const validateEmail: (email: string) => boolean;
export declare const insertWithHeap: (tableName: string, entity: any) => {
    query: string;
};
export declare const updateWithHeap: (tableName: string, entity: any, id: string) => {
    query: string;
};
export declare const buildHeap: (value: string, typeHeap: string) => {
    str: string;
    heaps: TextHeap[];
};
export declare const saveToHeap: (textHeaps: TextHeap[]) => {
    query: string;
};
export declare const isHashExist: (typeHeap: string, hash: string) => {
    query: string;
};
export declare const searchContents: (table: string, content: string) => {
    query: string;
};
export declare const buildLikeQuery: (column: string, baseQuery: string, terms: string[]) => {
    query: string;
    args: any[];
};
