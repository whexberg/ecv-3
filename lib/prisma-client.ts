import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { env } from 'prisma/config';

import { PrismaClient } from '@/lib/generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: env('DATABASE_URL') });
export const prisma = new PrismaClient({ adapter });
