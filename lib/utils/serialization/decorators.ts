/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    PropertyConverter,
    SerializeConverter,
    setConverterMap,
    setPropertyMap,
    setSerializable,
    setSerializeConverterMap,
    setTypeMap,
    TypeConstructor,
} from './symbols';

// Mark a class as serializable
export function Serializable<T extends { new (...args: any[]): any }>(constructor: T) {
    setSerializable(constructor.prototype);
    return constructor;
}

// Map a property to a different JSON key
export function JsonProperty(jsonKey: string) {
    return function (target: any, propertyKey: string) {
        setPropertyMap(target, propertyKey, jsonKey);
    };
}

// Specify the type for nested objects or arrays
export function JsonType(type: TypeConstructor | [TypeConstructor]) {
    return function (target: any, propertyKey: string) {
        setTypeMap(target, propertyKey, type);
    };
}

// Custom converter function for deserialization
export function JsonDeserializer<T>(converter: PropertyConverter<T>) {
    return function (target: any, propertyKey: string) {
        setConverterMap(target, propertyKey, converter);
    };
}

// Custom converter function for serialization
export function JsonSerializer<T>(converter: SerializeConverter<T>) {
    return function (target: any, propertyKey: string) {
        setSerializeConverterMap(target, propertyKey, converter);
    };
}

// Bidirectional converter
export function JsonConverter<T>(deserializer: PropertyConverter<T>, serializer: SerializeConverter<T>) {
    return function (target: any, propertyKey: string) {
        setConverterMap(target, propertyKey, deserializer);
        setSerializeConverterMap(target, propertyKey, serializer);
    };
}

// Combined decorator for convenience
export function JsonField(options: {
    key?: string;
    type?: TypeConstructor | [TypeConstructor];
    deserializer?: PropertyConverter;
    serializer?: SerializeConverter;
}) {
    return function (target: any, propertyKey: string) {
        if (options.key) {
            setPropertyMap(target, propertyKey, options.key);
        }
        if (options.type) {
            setTypeMap(target, propertyKey, options.type);
        }
        if (options.deserializer) {
            setConverterMap(target, propertyKey, options.deserializer);
        }
        if (options.serializer) {
            setSerializeConverterMap(target, propertyKey, options.serializer);
        }
    };
}
