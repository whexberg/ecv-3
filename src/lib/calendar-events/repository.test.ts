import { TestUtils } from '@/__test__/util';

import { getDB } from '../database/db';
import { CalendarEventsRepository } from './repository';

let repo: CalendarEventsRepository;

const DATABASE_NAME = 'lsd3_test';
const DATABASE_PASSWORD = 'test_password';
const DATABASE_HOST = 'postgres_test';
const DATABASE_PORT = 5434;
const DATABASE_USER = 'lsd3_test_user';

describe('events repository', () => {
    beforeAll(() => {
        repo = new CalendarEventsRepository(
            getDB({
                database: DATABASE_NAME,
                user: DATABASE_USER,
                password: DATABASE_PASSWORD,
                host: DATABASE_HOST,
                port: DATABASE_PORT,
                ssl: false,
            }),
            // new Kysely<DB>({
            //     dialect: new SqliteDialect({ database: new Sqlite('./test.db', {}) }),
            // }),
        );
    });

    afterAll(() => repo.destroy());

    test('getEvents', async () => {
        const result = await repo.getEvents();
        expect(result.length).toBeGreaterThan(0);
    });

    xtest('createEvent', async () => {
        const expected = TestUtils.fakeEvent();
        const result = await repo.createEvent(expected);
        console.log(expected, result);
        // expect(result.id).toEqual(expected.id);
        expect(result).toStrictEqual(expected);
    });
});
