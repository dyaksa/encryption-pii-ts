import { TextHeap, FindTextHeapByHashParams, FindTextHeapByContentParams } from './types';
import 'reflect-metadata';
export declare const generateSQLConditions: (data: any) => string[];
export declare const split: (value: string) => string[];
export declare const validateEmail: (email: string) => boolean;
export declare const insertWithHeap: (tableName: string, entity: any) => {
    query: string;
    args: any[];
};
export declare const updateWithHeap: (tableName: string, entity: any, id: string) => {
    query: string;
    args: any[];
};
export declare const buildHeap: (value: string, typeHeap: string) => {
    str: string;
    heaps: TextHeap[];
};
export declare const saveToHeap: (textHeaps: TextHeap[]) => {
    query: string;
    args: any[][];
};
export declare const isHashExist: (typeHeap: string, args: FindTextHeapByHashParams) => {
    query: string;
    args: any[];
};
export declare const searchContents: (table: string, args: FindTextHeapByContentParams) => {
    query: string;
    args: any[];
};
export declare const buildLikeQuery: (column: string, baseQuery: string, terms: string[]) => {
    query: string;
    args: any[];
};
