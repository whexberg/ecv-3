import dotenv from 'dotenv';
import type { Config } from 'kysely-codegen';

dotenv.config({ path: '.env' });

const config: Config = {
    dateParser: 'string',
    singularize: true,
    outFile: 'src/lib/database/db-types.ts',
    url: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:54322/${process.env.DATABASE_NAME}`,
};

export default config;
