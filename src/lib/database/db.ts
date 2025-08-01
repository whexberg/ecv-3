import { Pool, PoolClient } from 'pg';

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    ssl: false,

    // connectionString,
    // Optional: Add connection pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export const getDatabase = (): Pool => pool;

export const closeDatabase = async (): Promise<void> => {
    await pool.end();
};

// Helper function to get a client from the pool
export const getClient = async (): Promise<PoolClient> => {
    return await pool.connect();
};
