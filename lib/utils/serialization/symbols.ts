/* eslint-disable @typescript-eslint/no-explicit-any */

const METADATA_KEY = '__serialization_metadata__';

export interface SerializationMetadata {
    propertyMap: Record<string, string>;
    typeMap: Record<string, any>;
    converterMap: Record<string, any>;
    serializeConverterMap: Record<string, any>;
    isSerializable: boolean;
}

export function getMetadata(target: any): SerializationMetadata {
    if (!target[METADATA_KEY]) {
        target[METADATA_KEY] = {
            propertyMap: {},
            typeMap: {},
            converterMap: {},
            serializeConverterMap: {},
            isSerializable: false,
        };
    }
    return target[METADATA_KEY];
}

export function setPropertyMap(target: any, key: string, value: string) {
    const metadata = getMetadata(target);
    metadata.propertyMap[key] = value;
}

export function setTypeMap(target: any, key: string, value: any) {
    const metadata = getMetadata(target);
    metadata.typeMap[key] = value;
}

export function setConverterMap(target: any, key: string, value: any) {
    const metadata = getMetadata(target);
    metadata.converterMap[key] = value;
}

export function setSerializeConverterMap(target: any, key: string, value: any) {
    const metadata = getMetadata(target);
    metadata.serializeConverterMap[key] = value;
}

export function setSerializable(target: any, value: boolean = true) {
    const metadata = getMetadata(target);
    metadata.isSerializable = value;
}

export function isSerializable(target: any): boolean {
    const metadata = target[METADATA_KEY] as SerializationMetadata | undefined;
    return metadata?.isSerializable || false;
}

// Type definitions
export type PropertyConverter<T = any> = (value: any, instance?: any) => T;
export type SerializeConverter<T = any> = (value: T, instance?: any) => any;
export type TypeConstructor<T = any> = new (...args: any[]) => T;
