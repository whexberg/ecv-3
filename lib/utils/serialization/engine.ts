/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMetadata, isSerializable, TypeConstructor } from './symbols';

export class SerializationEngine {
    static deserialize<T>(data: any, targetClass: TypeConstructor<T>): T {
        if (!isSerializable(targetClass.prototype)) {
            throw new Error(`Class ${targetClass.name} is not marked as @Serializable`);
        }

        if (data === null || data === undefined) {
            throw new Error('Cannot deserialize null or undefined data');
        }

        if (typeof data !== 'object') {
            throw new Error('Data must be an object');
        }

        const instance = new targetClass();
        const prototype = targetClass.prototype;

        // Get metadata using our lightweight system
        const metadata = getMetadata(prototype);
        const { propertyMap, typeMap, converterMap } = metadata;

        // Create reverse mapping: JSON key -> property key
        const jsonToPropertyMap: Record<string, string> = {};
        Object.keys(propertyMap).forEach((propKey) => {
            jsonToPropertyMap[propertyMap[propKey]] = propKey;
        });

        // Process each key in the data
        Object.keys(data).forEach((jsonKey) => {
            const propertyKey = jsonToPropertyMap[jsonKey] || jsonKey;
            let value = data[jsonKey];

            // Apply custom converter if exists
            if (converterMap[propertyKey]) {
                try {
                    value = converterMap[propertyKey](value, instance);
                } catch (error) {
                    throw new Error(`Converter failed for property '${propertyKey}': ${error}`);
                }
            }
            // Apply type transformation
            else if (typeMap[propertyKey]) {
                const type = typeMap[propertyKey];
                try {
                    if (Array.isArray(type)) {
                        // Array type: [SomeClass]
                        value = this.deserializeArray(value, type[0]);
                    } else if (type === Date) {
                        value = new Date(value);
                    } else if (isSerializable(type.prototype)) {
                        // Nested serializable object
                        value = this.deserialize(value, type);
                    } else {
                        // Primitive type or unrecognized type
                        // eslint-disable-next-line
                        value = value;
                    }
                } catch (error) {
                    throw new Error(`Type transformation failed for property '${propertyKey}': ${error}`);
                }
            }

            (instance as any)[propertyKey] = value;
        });

        return instance;
    }

    static serialize<T>(instance: T): any {
        if (!instance || typeof instance !== 'object') {
            return instance;
        }

        const constructor = (instance as any).constructor;
        if (!isSerializable(constructor.prototype)) {
            throw new Error(`Class ${constructor.name} is not marked as @Serializable`);
        }

        const prototype = constructor.prototype;
        const metadata = getMetadata(prototype);
        const { propertyMap, serializeConverterMap } = metadata;

        const result: any = {};

        // Get all enumerable properties
        Object.keys(instance).forEach((propertyKey) => {
            const jsonKey = propertyMap[propertyKey] || propertyKey;
            let value = (instance as any)[propertyKey];

            // Apply custom serialize converter if exists
            if (serializeConverterMap[propertyKey]) {
                try {
                    value = serializeConverterMap[propertyKey](value, instance);
                } catch (error) {
                    throw new Error(`Serialize converter failed for property '${propertyKey}': ${error}`);
                }
            }
            // Handle different types
            else if (value === null || value === undefined) {
                // eslint-disable-next-line
                value = value;
            } else if (Array.isArray(value)) {
                value = value.map((item) => this.serialize(item));
            } else if (value instanceof Date) {
                value = value.toISOString();
            } else if (typeof value === 'object' && isSerializable(value.constructor.prototype)) {
                value = this.serialize(value);
            }
            // For other objects (like Luxon DateTime), we need to handle them
            else if (typeof value === 'object' && typeof value.toISO === 'function') {
                // Handle Luxon DateTime objects
                value = value.toISO();
            }

            result[jsonKey] = value;
        });

        return result;
    }

    static deserializeArray<T>(data: any[], targetClass: TypeConstructor<T>): T[] {
        if (!Array.isArray(data)) {
            throw new Error('Expected array for deserialization');
        }
        return data.map((item) => this.deserialize(item, targetClass));
    }

    static serializeArray<T>(instances: T[]): any[] {
        if (!Array.isArray(instances)) {
            throw new Error('Expected array for serialization');
        }
        return instances.map((instance) => this.serialize(instance));
    }
}
