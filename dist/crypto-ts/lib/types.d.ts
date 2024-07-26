export interface FindTextHeapByContentParams {
    content: string;
}
export interface FindTextHeapByHashParams {
    hash: string;
}
export interface FindTextHeapRow {
    id: string;
    content: string;
    hash: string;
}
export interface TextHeap {
    content: string;
    type: string;
    hash: string;
}
export declare class AesCipher {
    Value: string | Buffer;
    To: string | Buffer;
}
