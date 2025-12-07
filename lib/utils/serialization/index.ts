/* eslint-disable @typescript-eslint/no-explicit-any */

import { Result } from '@/lib/result';

import { SerializationEngine } from './engine';
import { TypeConstructor } from './symbols';

export * from './decorators';
export * from './engine';
export * from './symbols';

// Convenience functions
export function clone<T>(instance: T): T {
    return SerializationEngine.deserialize(SerializationEngine.serialize(instance), (instance as any).constructor);
}

export function deserialize<T>(data: any, targetClass: TypeConstructor<T>): T {
    return SerializationEngine.deserialize(data, targetClass);
}

export function serialize<T>(instance: T): any {
    return SerializationEngine.serialize(instance);
}

export function deserializeArray<T>(data: any[], targetClass: TypeConstructor<T>): T[] {
    return SerializationEngine.deserializeArray(data, targetClass);
}

export function serializeArray<T>(instances: T[]): any[] {
    return SerializationEngine.serializeArray(instances);
}

// Safe versions that return Result-like objects
export function safeDeserialize<T>(data: any, targetClass: TypeConstructor<T>): Result<T> {
    try {
        return Result.success(deserialize(data, targetClass));
    } catch (error) {
        return Result.failure(error instanceof Error ? error.message : 'Unknown error');
    }
}

export function safeSerialize<T>(instance: T): Result<T> {
    try {
        return Result.success(serialize(instance));
    } catch (error) {
        return Result.failure(error instanceof Error ? error.message : 'Unknown error');
    }
}
