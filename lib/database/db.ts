import { Pool, PoolClient } from 'pg';

const connectionString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?sslmode=disable`;

const pool = new Pool({
    connectionString,
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
