import { TextHeap } from './types';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
export declare const generateSQLConditions: (data: any) => string[];
export declare const split: (value: string) => string[];
export declare const getLast8Characters: (input: string) => string;
export declare const validateEmail: (email: string) => boolean;
export declare const insertWithHeap: (dt: DataSource, tableName: string, entity: any) => Promise<any>;
export declare const updateWithHeap: (dt: DataSource, tableName: string, entity: any, id: string) => Promise<any>;
export declare const buildHeap: (value: string, typeHeap: string) => {
    str: string;
    heaps: TextHeap[];
};
export declare const saveToHeap: (dt: DataSource, textHeaps: TextHeap[]) => Promise<void>;
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
