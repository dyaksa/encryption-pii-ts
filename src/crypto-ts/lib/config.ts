import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

export const dt_conf = async () => {
	dotenv.config();
	try {
		const dt = new DataSource({
			type: 'postgres',
			host: process.env.DB_AUTH_HOST || 'localhost',
			port: parseInt(process.env.DB_AUTH_PORT || '5433', 10),
			username: process.env.DB_AUTH_USERNAME || '',
			password: process.env.DB_AUTH_PASSWORD || '',
			database: process.env.DB_AUTH_DATABASE || '',
		});

		await dt.initialize();

		return dt;
	} catch (error) {
		throw error;
	}
};
