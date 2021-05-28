module.exports = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    synchronize: true,
    entities: ['src/entities/*.ts'],
    migrations: ['db/migrations/*.ts'],
    cli: {
        migrationsDir: 'db/migrations',
    },
    ssl: true,
    extra: {
	ssl: {
		rejectUnauthorized: false
	}
    }
};
