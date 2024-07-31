import { commonGenerateDigest } from './hmac';
import { AesCipher, FindTextHeapByContentParams, FindTextHeapRow, TextHeap } from './types';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { isValidPhone, parsePhone, phoneToString } from '../validate/phone';
import { isValidNIK, nikToString, parseNIK } from '../validate/nik';
import { isValidNPWP, npwpToString, parseNPWP } from '../validate/npwp';

dotenv.config();

const getMetadata = (entity: any, key: string, metaKey: string) => {
    return Reflect.getMetadata(metaKey, entity, key);
};

export const split = (value: string): string[] => {
	let sep = ' ';
	const reg = '[a-zA-Z0-9]+';
	const regex = new RegExp(reg, 'g');


	if (isValidPhone(value)) {
		const parsedPhone = parsePhone(value);
		const phoneStr = phoneToString(parsedPhone);
		sep = '-';
		value = phoneStr; 
    } else if (isValidNIK(value)) {
		const parseNik = parseNIK(value);
		const nikStr = nikToString(parseNik);
		sep = '.';
		value = nikStr; 
	} else if (isValidNPWP(value)) {
		const parseNpwp = parseNPWP(value);
		const npwpStr = npwpToString(parseNpwp);
		sep = '.';
		value = npwpStr; 
	} else if (validateEmail(value)) {
        sep = '@';
    }

	const parts = value.split(sep);
	const result = parts.flatMap(part => part.match(regex) || []);

	return result;
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

export const saveToHeap = async (dt: DataSource, textHeaps: TextHeap[]): Promise<void> => {
    await dt.transaction(async (entityManager) => {
        // Group textHeaps by their type
        const textHeapsByType = textHeaps.reduce((acc, th) => {
            if (!acc[th.type]) {
                acc[th.type] = [];
            }
            acc[th.type].push(th);
            return acc;
        }, {} as { [key: string]: TextHeap[] });

        // Iterate over each group and perform the operations
        for (const type in textHeapsByType) {
            const group = textHeapsByType[type];

            // Extract all hashes from the current group
            const hashes = group.map(th => th.hash);

            // Check existence of all hashes in one query
            const existQuery = `SELECT hash FROM ${type} WHERE hash = ANY($1)`;
            const existRes = await entityManager.query(existQuery, [hashes]);

            // Create a Set of existing hashes for quick lookup
            const existingHashes = new Set(existRes.map(row => row.hash));

            // Filter out textHeaps that already exist
            const newTextHeaps = group.filter(th => !existingHashes.has(th.hash));

            if (newTextHeaps.length > 0) {
                // Prepare batch insert query
                const insertValues: any[] = [];
                const insertPlaceholders: string[] = [];

                newTextHeaps.forEach((th, index) => {
                    insertValues.push(th.content, th.hash);
                    insertPlaceholders.push(`($${2 * index + 1}, $${2 * index + 2})`);
                });

                const insertQuery = `INSERT INTO ${type} (content, hash) VALUES ${insertPlaceholders.join(', ')} ON CONFLICT DO NOTHING`;
                await entityManager.query(insertQuery, insertValues);
            }
        }
    });
};


// SearchContents
export const searchContents = async (
  datasource: DataSource,
  table: string,
  args: FindTextHeapByContentParams
): Promise<FindTextHeapRow[]> => {
  const query = `SELECT id, content, hash FROM ${table} WHERE content ILIKE '%' || $1 || '%'`;
  const parameters = [args.content];
  const result = await datasource.query(query, parameters);

  return result.map((row: any) => ({
    id: row.id,
    content: row.content,
    hash: row.hash,
  }));
};

// buildBlindIndex
export const buildBlindIndex = async (
	dt: DataSource,
	entity: any
): Promise<any> => {
	const th: TextHeap[] = [];
    const result: { [key: string]: any } = {};

	for (const key in entity) {
		if (entity.hasOwnProperty(key)) {
			const fieldName = getMetadata(entity, key, 'db');
			if (fieldName) {

				if(entity[key] instanceof AesCipher) {
					let value = entity[key].To.toString();
					let encryptWithAesBuf = entity[key].Value;

					// assign encrypt to fieldName
					result[fieldName] = encryptWithAesBuf;

					const txtHeapTable = getMetadata(entity, key, 'txt_heap_table');
					if (txtHeapTable) {
						const { str, heaps } = buildHeap(value, txtHeapTable);
						th.push(...heaps);
							
						const bidxCol = getMetadata(entity, key, 'bidx_col');
						if (bidxCol) {
							// assign bidx_col with heap
							result[bidxCol] = str;
						}
					}
				}
			}
		}
	}

	await saveToHeap(dt, th);

	return result;
};