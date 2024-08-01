import { DataSource } from "typeorm";

export const dt_conf = async () => {
	try {
		const dt = new DataSource({
			type: 'postgres',
			host: process.env.DB_AUTH_HOST || 'localhost',
			port: parseInt(process.env.DB_AUTH_PORT || '35432', 10),
			username: process.env.DB_AUTH_USERNAME || '',
			password: process.env.DB_AUTH_PASSWORD || '',
			database: process.env.DB_AUTH_DATABASE || '',
		});

		await dt.initialize();
		console.log("Data Source has been initialized!");

		return dt;
	} catch (error) {
		console.error("Error during Data Source initialization:", error);
		throw error;
	}
};
