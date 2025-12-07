import 'reflect-metadata';

import { DateTime } from 'luxon';

import { clone, deserialize, serialize } from '@/lib/utils/serialization';

import { RecurrenceRule } from './recurrence-rule';

describe('RecurrenceRule', () => {
    const mockDateTime = DateTime.fromISO('2025-01-15T10:30:00.000Z') as DateTime<true>;

    beforeEach(() => {
        // Mock DateTime.now() to return consistent values in tests
        jest.spyOn(DateTime, 'now').mockReturnValue(mockDateTime);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('Serialization', () => {
        test('should serialize RecurrenceRule correctly', () => {
            const rule = new RecurrenceRule();
            rule.id = 'test-id';
            rule.label = 'Every Friday';
            rule.rrule = 'FREQ=WEEKLY;BYDAY=FR';
            rule.start = DateTime.fromISO('2025-01-01T09:00:00.000Z');
            rule.until = DateTime.fromISO('2025-12-31T23:59:59.999Z');
            rule.count = 52;
            rule.tzid = 'America/Los_Angeles';
            rule.createdAt = DateTime.fromISO('2025-01-01T12:00:00.000Z');
            rule.updatedAt = DateTime.fromISO('2025-01-15T12:00:00.000Z');

            const serialized = serialize(rule);

            expect(serialized).toEqual({
                id: 'test-id',
                label: 'Every Friday',
                rrule: 'FREQ=WEEKLY;BYDAY=FR',
                start: '2025-01-01T09:00:00.000Z',
                until: '2025-12-31T23:59:59.999Z',
                count: 52,
                tzid: 'America/Los_Angeles',
                created_at: '2025-01-01T12:00:00.000Z',
                updated_at: '2025-01-15T12:00:00.000Z',
            });
        });

        test('should handle null until date', () => {
            const rule = new RecurrenceRule();
            rule.until = null;

            const serialized = serialize(rule);
            expect(serialized.until).toBeNull();
        });

        test('should serialize DateTime fields as ISO strings', () => {
            const rule = new RecurrenceRule();
            const testDate = DateTime.fromISO('2025-06-15T14:30:00.000Z');
            rule.start = testDate;

            const serialized = serialize(rule);
            expect(serialized.start).toBe('2025-06-15T14:30:00.000Z');
            expect(typeof serialized.start).toBe('string');
        });
    });

    describe('Deserialization', () => {
        test('should deserialize RecurrenceRule correctly', () => {
            const data = {
                id: 'test-id',
                label: 'Every Friday',
                rrule: 'FREQ=WEEKLY;BYDAY=FR',
                start: '2025-01-01T09:00:00.000Z',
                until: '2025-12-31T23:59:59.999Z',
                count: 52,
                tzid: 'America/Los_Angeles',
                created_at: '2025-01-01T12:00:00.000Z',
                updated_at: '2025-01-15T12:00:00.000Z',
            };

            const deserialized = deserialize(data, RecurrenceRule);

            expect(deserialized).toBeInstanceOf(RecurrenceRule);
            expect(deserialized.id).toBe('test-id');
            expect(deserialized.label).toBe('Every Friday');
            expect(deserialized.rrule).toBe('FREQ=WEEKLY;BYDAY=FR');
            expect(deserialized.start).toBeInstanceOf(DateTime);
            expect(deserialized.start.toJSDate().toISOString()).toBe('2025-01-01T09:00:00.000Z');
            expect(deserialized.until).toBeInstanceOf(DateTime);
            expect(deserialized.until?.toJSDate().toISOString()).toBe('2025-12-31T23:59:59.999Z');
            expect(deserialized.count).toBe(52);
            expect(deserialized.tzid).toBe('America/Los_Angeles');
            expect(deserialized.createdAt).toBeInstanceOf(DateTime);
            expect(deserialized.updatedAt).toBeInstanceOf(DateTime);
        });

        test('should handle null until date during deserialization', () => {
            const data = {
                id: 'test-id',
                label: 'Forever rule',
                rrule: 'FREQ=DAILY',
                start: '2025-01-01T09:00:00.000Z',
                until: null,
                count: null,
                tzid: 'UTC',
                created_at: '2025-01-01T12:00:00.000Z',
                updated_at: '2025-01-15T12:00:00.000Z',
            };

            const deserialized = deserialize(data, RecurrenceRule);
            expect(deserialized.until).toBeNull();
            expect(deserialized.count).toBeNull();
        });

        test('should convert string dates to DateTime objects', () => {
            const data = {
                start: '2025-01-01T09:00:00.000Z',
                created_at: '2025-01-01T12:00:00.000Z',
                updated_at: '2025-01-15T12:00:00.000Z',
            };

            const deserialized = deserialize(data, RecurrenceRule);

            expect(deserialized.start).toBeInstanceOf(DateTime);
            expect(deserialized.createdAt).toBeInstanceOf(DateTime);
            expect(deserialized.updatedAt).toBeInstanceOf(DateTime);
        });
    });

    describe('Round-trip Serialization', () => {
        test('should maintain data integrity through serialize -> deserialize cycle', () => {
            const original = new RecurrenceRule();
            original.id = 'round-trip-test';
            original.label = 'Monthly Meeting';
            original.rrule = 'FREQ=MONTHLY;BYDAY=1FR';
            original.start = DateTime.fromISO('2025-01-03T20:00:00.000Z');
            original.until = DateTime.fromISO('2026-01-01T00:00:00.000Z');
            original.count = null;
            original.tzid = 'America/Los_Angeles';

            const serialized = serialize(original);
            const deserialized = deserialize(serialized, RecurrenceRule);

            expect(deserialized.id).toBe(original.id);
            expect(deserialized.label).toBe(original.label);
            expect(deserialized.rrule).toBe(original.rrule);
            expect(deserialized.start.toMillis()).toBe(original.start.toMillis());
            expect(deserialized.until?.toMillis()).toBe(original.until?.toMillis());
            expect(deserialized.count).toBe(original.count);
            expect(deserialized.tzid).toBe(original.tzid);
        });

        test('should handle multiple round-trips', () => {
            const original = new RecurrenceRule();
            original.id = 'multi-round-trip';
            original.label = 'Test Rule';
            original.start = DateTime.fromISO('2025-01-01T12:00:00.000Z');

            let current = original;

            // Perform multiple serialize-deserialize cycles
            for (let i = 0; i < 3; i++) {
                const serialized = serialize(current);
                current = deserialize(serialized, RecurrenceRule);
            }

            expect(current.id).toBe(original.id);
            expect(current.label).toBe(original.label);
            expect(current.start.toMillis()).toBe(original.start.toMillis());
        });
    });

    describe('Clone Method', () => {
        test('should clone RecurrenceRule correctly', () => {
            const original = deserialize(
                {
                    id: 'clone-test',
                    label: 'Original Rule',
                    rrule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR',
                    start: DateTime.fromISO('2025-01-01T08:00:00.000Z'),
                    until: DateTime.fromISO('2025-06-01T00:00:00.000Z'),
                    tzid: 'Europe/London',
                },
                RecurrenceRule,
            );

            const cloned = clone(original);
            expect(cloned).toBeInstanceOf(RecurrenceRule);
            expect(cloned).not.toBe(original); // Different object reference
            expect(cloned.id).toBe(original.id);
            expect(cloned.label).toBe(original.label);
            expect(cloned.rrule).toBe(original.rrule);
            expect(cloned.start.toMillis()).toBe(original.start.toMillis());
            expect(cloned.until?.toMillis()).toBe(original.until?.toMillis());
            expect(cloned.tzid).toBe(original.tzid);
        });

        test('should create independent clones', () => {
            const original = deserialize({ id: 'independence-test', label: 'Original' }, RecurrenceRule);

            const cloned = RecurrenceRule.clone(original);
            cloned.id = 'modified-id';
            cloned.label = 'Modified';

            expect(original.id).toBe('independence-test');
            expect(original.label).toBe('Original');
            expect(cloned.id).toBe('modified-id');
            expect(cloned.label).toBe('Modified');
        });
    });

    describe('Error Handling', () => {
        test('should handle invalid ISO date strings gracefully', () => {
            const data = {
                id: 'error-test',
                start: 'invalid-date-string',
                created_at: '2025-01-01T12:00:00.000Z',
                updated_at: '2025-01-01T12:00:00.000Z',
            };

            expect(() => deserialize(data, RecurrenceRule)).toThrow(); // Should throw because DateTime.fromISO will fail
        });
    });

    describe('Edge Cases', () => {
        test('should handle minimal data', () => {
            const data = {
                id: '',
                label: '',
                rrule: '',
                start: '2025-01-01T00:00:00.000Z',
                until: null,
                count: null,
                tzid: '',
                created_at: '2025-01-01T00:00:00.000Z',
                updated_at: '2025-01-01T00:00:00.000Z',
            };

            const deserialized = deserialize(data, RecurrenceRule);

            expect(deserialized.id).toBe('');
            expect(deserialized.label).toBe('');
            expect(deserialized.rrule).toBe('');
            expect(deserialized.until).toBeNull();
            expect(deserialized.count).toBeNull();
            expect(deserialized.tzid).toBe('');
        });

        test('should handle default values', () => {
            const rule = deserialize({}, RecurrenceRule);

            expect(rule.id).toBe('');
            expect(rule.label).toBe('');
            expect(rule.rrule).toBe('');
            expect(rule.start).toBeInstanceOf(DateTime);
            expect(rule.until).toBeNull();
            expect(rule.count).toBeNull();
            expect(rule.tzid).toBe('');
            expect(rule.createdAt).toBeInstanceOf(DateTime);
            expect(rule.updatedAt).toBeInstanceOf(DateTime);
        });
    });
});
