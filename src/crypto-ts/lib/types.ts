
export interface FindTextHeapByHashParams {
	hash: string;
}

export interface FindTextHeapRow {
	id: string; // Assuming UUID as string
	content: string;
	hash: string;
}

export interface TextHeap {
	content: string;
	type: string;
	hash: string;
}

export interface NullType<T> {
	valid: boolean;
	value: T | null;
}

export interface Crypto {
	hmacFunc: () => (data: string) => string;
}
