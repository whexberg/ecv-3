import 'reflect-metadata';

import { DateTime } from 'luxon';

import {
    deserialize,
    deserializeArray,
    JsonConverter,
    JsonProperty,
    JsonSerializer,
    JsonType,
    safeDeserialize,
    safeSerialize,
    Serializable,
    serialize,
    serializeArray,
} from './index';

// Test classes
@Serializable
class SimpleTestClass {
    name: string = '';
    age: number = 0;
    active: boolean = false;
}

@Serializable
class PropertyMappingClass {
    @JsonProperty('first_name')
    firstName: string = '';

    @JsonProperty('last_name')
    lastName: string = '';

    email: string = '';
}

@Serializable
class DateTimeTestClass {
    @JsonConverter((value: string) => DateTime.fromISO(value), (value: DateTime) => value.toISO())
    timestamp: DateTime = DateTime.now();

    @JsonProperty('created_at')
    @JsonConverter((value: string) => DateTime.fromISO(value), (value: DateTime) => value.toISO())
    createdAt: DateTime = DateTime.now();
}

@Serializable
class NestedClass {
    value: string = '';
}

@Serializable
class ParentClass {
    @JsonType(NestedClass)
    nested: NestedClass = new NestedClass();

    @JsonType([NestedClass])
    nestedArray: NestedClass[] = [];
}

@Serializable
class SerializeConverterClass {
    @JsonSerializer((value: string) => value.toUpperCase())
    name: string = '';

    @JsonConverter(
        (value: string) => value.toLowerCase(), // deserialize to lowercase
        (value: string) => value.toUpperCase(), // serialize to uppercase
    )
    description: string = '';
}

describe('Serialization System', () => {
    beforeEach(() => {
        // Reset any global state if needed
    });

    describe('Basic Serialization/Deserialization', () => {
        test('should serialize and deserialize simple objects', () => {
            const original = new SimpleTestClass();
            original.name = 'John Doe';
            original.age = 30;
            original.active = true;

            const serialized = serialize(original);
            expect(serialized).toEqual({
                name: 'John Doe',
                age: 30,
                active: true,
            });

            const deserialized = deserialize(serialized, SimpleTestClass);
            expect(deserialized).toBeInstanceOf(SimpleTestClass);
            expect(deserialized.name).toBe('John Doe');
            expect(deserialized.age).toBe(30);
            expect(deserialized.active).toBe(true);
        });

        test('should handle property mapping', () => {
            const original = new PropertyMappingClass();
            original.firstName = 'John';
            original.lastName = 'Doe';
            original.email = 'john@example.com';

            const serialized = serialize(original);
            expect(serialized).toEqual({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
            });

            const deserialized = deserialize(serialized, PropertyMappingClass);
            expect(deserialized.firstName).toBe('John');
            expect(deserialized.lastName).toBe('Doe');
            expect(deserialized.email).toBe('john@example.com');
        });

        test('should handle DateTime conversion', () => {
            const now = DateTime.now();
            const original = new DateTimeTestClass();
            original.timestamp = now;
            original.createdAt = now;

            const serialized = serialize(original);
            expect(typeof serialized.timestamp).toBe('string');
            expect(typeof serialized.created_at).toBe('string');
            expect(serialized.timestamp).toBe(now.toISO());

            const deserialized = deserialize(serialized, DateTimeTestClass);
            expect(deserialized.timestamp).toBeInstanceOf(DateTime);
            expect(deserialized.createdAt).toBeInstanceOf(DateTime);
            expect(deserialized.timestamp.toMillis()).toBe(now.toMillis());
        });
    });

    describe('Nested Objects and Arrays', () => {
        test('should handle nested objects', () => {
            const original = new ParentClass();
            original.nested.value = 'test value';

            const serialized = serialize(original);
            expect(serialized.nested.value).toBe('test value');

            const deserialized = deserialize(serialized, ParentClass);
            expect(deserialized.nested).toBeInstanceOf(NestedClass);
            expect(deserialized.nested.value).toBe('test value');
        });

        test('should handle arrays of nested objects', () => {
            const original = new ParentClass();
            const nested1 = new NestedClass();
            nested1.value = 'first';
            const nested2 = new NestedClass();
            nested2.value = 'second';
            original.nestedArray = [nested1, nested2];

            const serialized = serialize(original);
            expect(serialized.nestedArray).toHaveLength(2);
            expect(serialized.nestedArray[0].value).toBe('first');

            const deserialized = deserialize(serialized, ParentClass);
            expect(deserialized.nestedArray).toHaveLength(2);
            expect(deserialized.nestedArray[0]).toBeInstanceOf(NestedClass);
            expect(deserialized.nestedArray[0].value).toBe('first');
            expect(deserialized.nestedArray[1].value).toBe('second');
        });
    });

    describe('Custom Converters', () => {
        test('should apply serialize converters', () => {
            const original = new SerializeConverterClass();
            original.name = 'john doe';
            original.description = 'Test Description';

            const serialized = serialize(original);
            expect(serialized.name).toBe('JOHN DOE'); // uppercase from serialize converter
            expect(serialized.description).toBe('TEST DESCRIPTION'); // uppercase from bidirectional
        });

        test('should apply bidirectional converters correctly', () => {
            const data = {
                name: 'ignored', // no deserialize converter
                description: 'TEST INPUT',
            };

            const deserialized = deserialize(data, SerializeConverterClass);
            expect(deserialized.description).toBe('test input'); // lowercase from deserialize converter

            const serialized = serialize(deserialized);
            expect(serialized.description).toBe('TEST INPUT'); // back to uppercase
        });
    });

    describe('Array Operations', () => {
        test('should serialize and deserialize arrays', () => {
            const original = [
                Object.assign(new SimpleTestClass(), { name: 'John', age: 30 }),
                Object.assign(new SimpleTestClass(), { name: 'Jane', age: 25 }),
            ];

            const serialized = serializeArray(original);
            expect(serialized).toHaveLength(2);
            expect(serialized[0].name).toBe('John');

            const deserialized = deserializeArray(serialized, SimpleTestClass);
            expect(deserialized).toHaveLength(2);
            expect(deserialized[0]).toBeInstanceOf(SimpleTestClass);
            expect(deserialized[0].name).toBe('John');
        });
    });

    describe('Error Handling', () => {
        test('should throw error for non-serializable classes', () => {
            class NonSerializable {
                name: string = '';
            }

            const instance = new NonSerializable();
            expect(() => serialize(instance)).toThrow('not marked as @Serializable');
        });

        test('should throw error for invalid data', () => {
            expect(() => deserialize(null, SimpleTestClass)).toThrow('Cannot deserialize null');
            expect(() => deserialize('invalid', SimpleTestClass)).toThrow('Data must be an object');
        });

        test('should handle safe operations', () => {
            const original = new SimpleTestClass();
            original.name = 'test';

            const safeSerializeResult = safeSerialize(original);
            expect(safeSerializeResult.isSuccess).toBe(true);
            if (safeSerializeResult.isSuccess) {
                expect(safeSerializeResult.value.name).toBe('test');
            }

            const safeDeserializeResult = safeDeserialize({ name: 'test', age: 25 }, SimpleTestClass);
            expect(safeDeserializeResult.isSuccess).toBe(true);
            if (safeDeserializeResult.isSuccess) {
                expect(safeDeserializeResult.value.name).toBe('test');
            }

            // Test error case
            class NonSerializable {
                name: string = '';
            }

            const errorResult = safeSerialize(new NonSerializable());
            expect(errorResult.isSuccess).toBe(false);
            if (!errorResult.isSuccess) {
                expect(errorResult.error).toContain('not marked as @Serializable');
            }
        });
    });

    describe('Edge Cases', () => {
        test('should handle null and undefined values', () => {
            const data = {
                name: 'test',
                age: null,
                active: undefined,
            };

            const deserialized = deserialize(data, SimpleTestClass);
            expect(deserialized.name).toBe('test');
            expect(deserialized.age).toBeNull();
        });

        test('should handle empty objects and arrays', () => {
            const parent = new ParentClass();
            parent.nestedArray = [];

            const serialized = serialize(parent);
            expect(serialized.nestedArray).toEqual([]);

            const deserialized = deserialize(serialized, ParentClass);
            expect(deserialized.nestedArray).toEqual([]);
        });
    });
});
