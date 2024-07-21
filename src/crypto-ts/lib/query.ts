import { commonGenerateDigest } from './hmac';
import { TextHeap, FindTextHeapByContentParams } from './types';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

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

export const getLast8Characters = (input: string): string => {
	if (input.length <= 8) {
		return input;
	}
	return input.slice(-8);
}

export const validateEmail = (email: string): boolean => {
	const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegexPattern.test(email);
};

export const insertWithHeap = (
    tableName: string,
    entity: any,
): { 
	query: string,
} => {
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
                args.push(`'${value}'`);

                const bidxCol = getMetadata(entity, key, 'bidx_col');
				if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);

                    const fieldValue = entity[key];
                    if (fieldValue) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = buildHeap(fieldValue, txtHeapTable);
						th.push(...heaps);
                        args.push(`'${str}'`);
                    }
                }

                placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }

	const saveHeap = saveToHeap(th);

    const query = `
		INSERT INTO ${tableName} (${fieldNames.join(', ')}) VALUES (${args}) RETURNING id;
		${saveHeap.query}
	`;

    return { query };
};

export const updateWithHeap = (
    tableName: string,
    entity: any,
    id: string
): { query: string } => {
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
                args.push(`'${value}'`);

                const bidxCol = getMetadata(entity, key, 'bidx_col');
                if (bidxCol) {
                    fieldNames.push(bidxCol);
                    placeholders.push(`$${placeholders.length + 1}`);

                    const fieldValue = entity[key];
                    if (fieldValue) {
                        const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
                        const { str, heaps } = buildHeap(fieldValue, txtHeapTable);
                        th.push(...heaps);
                        args.push(`'${str}'`);
                    }
                }
				placeholders.push(`$${placeholders.length + 1}`);
            }
        }
    }

	const saveHeap = saveToHeap(th);

    let query = `UPDATE ${tableName} SET `;
    for (let i = 0; i < fieldNames.length; i++) {
        query += `${fieldNames[i]} = ${args[i]}, `;
    }
    query = query.slice(0, -2); // Remove last comma and space
    query += ` 
		WHERE id = '${id}'; 
		${saveHeap.query}
	`;

    return { query };
};

export const buildHeap = (value: string, typeHeap: string): { str: string; heaps: TextHeap[] } => {
	const values = split(value);
	const builder = new Set<string>();
	const heaps: TextHeap[] = [];

	values.forEach(val => {
		const hash = commonGenerateDigest('SHA256', val);
		const hash8LastChar = getLast8Characters(hash);
		builder.add(hash8LastChar);
		heaps.push({ content: val.toLowerCase(), type: typeHeap, hash: hash8LastChar });
	});

	return { str: Array.from(builder).join(''), heaps };
};

export const saveToHeap = (textHeaps: TextHeap[]): { query: string } => {
	let combinedQuery = '';

	for (const th of textHeaps) {
		const existQuery = `SELECT 1 FROM ${th.type} WHERE hash = '${th.hash}'`;
		const insertQuery = `INSERT INTO ${th.type} (content, hash) VALUES ('${th.content}', '${th.hash}') ON CONFLICT DO NOTHING`;

		combinedQuery += `DO $$
							BEGIN
								IF NOT EXISTS (${existQuery}) THEN
									${insertQuery};
								END IF;
							END $$; `;
	}

	return { query: combinedQuery.trim().replace(/;$/, '') };
};

export const isHashExist = (
	typeHeap: string,
	hash: string
): { query: string } => {
	const query = `SELECT hash FROM ${typeHeap} WHERE hash = '${hash}'`;
	return { query };
};

export const searchContents = (
	table: string,
	content: string
): { query: string } => {
	const query = `SELECT content, hash FROM ${table} WHERE content ILIKE '%' || '${content}' || '%';`;
	return { query };
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
