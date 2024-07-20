import { TextHeap, Crypto, FindTextHeapByHashParams, FindTextHeapByContentParams } from './types';
import 'reflect-metadata';

const getMetadata = (entity: any, key: string, metaKey: string) => {
    return Reflect.getMetadata(metaKey, entity, key);
};

export const generateSQLConditions = (data: any): string[] => {
    const conditions: string[] = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            const bidxCol = getMetadata(data, key, 'bidx_col');
            if (bidxCol) {
                conditions.push(`${bidxCol} ILIKE '%${value}%'`);
            }
        }
    }
    return conditions;
};

export const split = (value: string): string[] => {
	let sep = ' ';
	const reg = '[a-zA-Z0-9]+';
	const regex = new RegExp(reg, 'g');

	if (validateEmail(value)) {
		sep = '@';
	}

	const parts = value.split(sep);
	return parts.flatMap(part => part.match(regex) || []);
};

export const validateEmail = (email: string): boolean => {
	const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegexPattern.test(email);
};

export const insertWithHeap = <T>(
    c: Crypto,
    tableName: string,
    entity: any,
): { query: string, args: any[] } => {
    const fieldNames: string[] = [];
    const args: any[] = [];
    const placeholders: string[] = [];
    const th: TextHeap[] = [];

    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                const value = entity[key];
                args.push(value);

                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);

                    const fieldValue = entity[key];
                    if (fieldValue && fieldValue.to) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = buildHeap(c, fieldValue.to(), txtHeapTable);
                        th.push(...heaps);
                        args.push(str);
                    }
                }

                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }

    const query = `INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING id`;
    return { query, args };
};

export const updateWithHeap = (
    c: Crypto,
    tableName: string,
    entity: any,
    id: string
): { query: string, args: any[] } => {
    const fieldNames: string[] = [];
    const placeholders: string[] = [];
    const args: any[] = [];
    const th: TextHeap[] = [];

    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const fieldName = getMetadata(entity, key, 'db');
            if (fieldName) {
                fieldNames.push(fieldName);
                const value = entity[key];
                args.push(value);

                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);

                    const fieldValue = entity[key];
                    if (fieldValue && fieldValue.to) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = buildHeap(c, fieldValue.to(), txtHeapTable);
                        th.push(...heaps);
                        args.push(str);
                    }
                }

                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }

    let query = `UPDATE ${tableName} SET `;
    for (let i = 0; i < fieldNames.length; i++) {
        query += `${fieldNames[i]} = ${placeholders[i]}, `;
    }
    query = query.slice(0, -2); // Remove last comma and space
    query += ` WHERE id = $${placeholders.length + 1}`;

    return { query, args: [...args, id] };
};

export const buildHeap = (c: Crypto, value: string, typeHeap: string): { str: string; heaps: TextHeap[] } => {
	const values = split(value);
	const builder = new Set<string>();
	const heaps: TextHeap[] = [];

	values.forEach(val => {
		const hash = c.hmacFunc()(val);
		builder.add(hash);
		heaps.push({ content: val.toLowerCase(), type: typeHeap, hash });
	});

	return { str: Array.from(builder).join(''), heaps };
};

export const saveToHeap = (textHeaps: TextHeap[]): { query: string, args: any[][] } => {
	const queries: { query: string, args: any[] }[] = [];

	for (const th of textHeaps) {
		const query = `INSERT INTO ${th.type} (content, hash) VALUES ($1, $2) ON CONFLICT DO NOTHING`;
		queries.push({ query, args: [th.content, th.hash] });
	}

	return { query: queries.map(q => q.query).join('; '), args: queries.map(q => q.args) };
};

export const isHashExist = (
	typeHeap: string,
	args: FindTextHeapByHashParams
): { query: string, args: any[] } => {
	const query = `SELECT hash FROM ${typeHeap} WHERE hash = $1`;
	return { query, args: [args.hash] };
};

export const searchContents = (
	table: string,
	args: FindTextHeapByContentParams
): { query: string, args: any[] } => {
	const query = `SELECT content, hash FROM ${table} WHERE content ILIKE $1`;
	return { query, args: [`%${args.content}%`] };
};

export const buildLikeQuery = (column: string, baseQuery: string, terms: string[]): { query: string, args: any[] } => {
	const likeClauses: string[] = [];
	const args: any[] = [];

	terms.forEach(term => {
		likeClauses.push(`${column} ILIKE $${args.length + 1}`);
		args.push(`%${term}%`);
	});

	const fullQuery = `${baseQuery} WHERE ${likeClauses.join(' OR ')}`;
	return { query: fullQuery, args };
};
