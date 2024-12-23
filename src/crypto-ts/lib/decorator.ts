// decorators.ts
export function DBColumn(columnName: string): PropertyDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata('db', columnName, target, propertyKey);
	};
}

export function BidxCol(columnName: string): PropertyDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata('bidx_col', columnName, target, propertyKey);
	};
}

export function TxtHeapTable(tableName: string): PropertyDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata(
			'txt_heap_table',
			tableName,
			target,
			propertyKey,
		);
	};
}

export function FullTextSearch(status: boolean): PropertyDecorator {
	return (target, propertyKey) => {
		Reflect.defineMetadata('full_text_search', status, target, propertyKey);
	};
}
