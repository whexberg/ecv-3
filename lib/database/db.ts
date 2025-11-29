import { Kysely, PostgresDialect } from 'kysely';
import * as pg from 'pg';
import { parseIntoClientConfig } from 'pg-connection-string';

import { DB } from './db-types';

const TIMESTAMP_OID = 1114;
const TIMESTAMPTZ_OID = 1184;
const DATE_OID = 1082;

pg.types.setTypeParser(TIMESTAMP_OID, (val) => val);
pg.types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
pg.types.setTypeParser(DATE_OID, (val) => val);

let db: Kysely<DB>;

export const getDB = ({
    // host = process.env.DATABASE_HOST,
    // ssl = false,
    database = process.env.DATABASE_NAME,
    password = process.env.DATABASE_PASSWORD,
    port = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
    user = process.env.DATABASE_USER,
}: {
    user?: string;
    password?: string;
    host?: string;
    database?: string;
    port?: number;
    ssl?: boolean;
} = {}) => {
    db ??= new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new pg.Pool(
                parseIntoClientConfig(`postgres://${user}:${password}@postgres:${port}/${database}?sslmode=disable`),
            ),
        }),
    });

    return db;
};

export const DBUtils = {
    getDB,
};
