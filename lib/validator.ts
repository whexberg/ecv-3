import { EventType } from '@/lib/generated/prisma/enums';

type ValidationOptions = {
    allowNull?: boolean;
    allowUndefined?: boolean;
};

// @formatter:off
export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}
export function isNull(value: unknown): value is null {
    return value === null;
}

export function isString(value: unknown, options: { allowNull: true; allowUndefined: true }): value is string | null | undefined;
export function isString(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is string | null;
export function isString(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is string | undefined;
export function isString(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is string;
export function isString(value: unknown, options?: ValidationOptions): value is string | null | undefined {
    return typeof value === 'string' || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

export function isNumber(value: unknown, options: { allowNull: true; allowUndefined: true }): value is number | null | undefined;
export function isNumber(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is number | null;
export function isNumber(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is number | undefined;
export function isNumber(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is number;
export function isNumber(value: unknown, options?: ValidationOptions): value is number | null | undefined {
    return typeof value === 'number' || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

export function isBoolean(value: unknown, options: { allowNull: true; allowUndefined: true }): value is boolean | null | undefined;
export function isBoolean(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is boolean | null;
export function isBoolean(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is boolean | undefined;
export function isBoolean(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is boolean;
export function isBoolean(value: unknown, options?: ValidationOptions): value is boolean | null | undefined {
    return typeof value === 'boolean' || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

export function isObject(value: unknown, options: { allowNull: true; allowUndefined: true }): value is Record<string, unknown> | null | undefined;
export function isObject(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is Record<string, unknown> | null;
export function isObject(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is Record<string, unknown> | undefined;
export function isObject(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is Record<string, unknown>;
export function isObject(value: unknown, options?: ValidationOptions): value is Record<string, unknown> | null | undefined {
    return (value !== null && typeof value === 'object' && !Array.isArray(value)) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

export function isDate(value: unknown, options: { allowNull: true; allowUndefined: true }): value is Date | null | undefined;
export function isDate(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is Date | null;
export function isDate(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is Date | undefined;
export function isDate(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is Date;
export function isDate(value: unknown, options?: ValidationOptions): value is Date | null | undefined {
    return value instanceof Date || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

export function isArray(value: unknown, options: { allowNull: true; allowUndefined: true }): value is Array<unknown> | null | undefined;
export function isArray(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is Array<unknown> | null;
export function isArray(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is Array<unknown> | undefined;
export function isArray(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is Array<unknown>;
export function isArray(value: unknown, options?: ValidationOptions): value is Array<unknown> | null | undefined {
    return Array.isArray(value) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

// Custom validation for arrays of a specific type
export function isArrayOfType<T>(value: unknown, itemValidator: (item: unknown) => item is T, options: { allowNull: true; allowUndefined: true }): value is Array<T> | null | undefined;
export function isArrayOfType<T>(value: unknown, itemValidator: (item: unknown) => item is T, options: { allowNull: true; allowUndefined?: false }): value is Array<T> | null;
export function isArrayOfType<T>(value: unknown, itemValidator: (item: unknown) => item is T, options: { allowNull?: false; allowUndefined: true }): value is Array<T> | undefined;
export function isArrayOfType<T>(value: unknown, itemValidator: (item: unknown) => item is T, options?: { allowNull?: false; allowUndefined?: false }): value is Array<T>;
export function isArrayOfType<T>(value: unknown, itemValidator: (item: unknown) => item is T, options?: ValidationOptions): value is T[] | null | undefined {
    return (Array.isArray(value) && value.every(itemValidator)) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

// Non-empty string validation
export function isNonEmptyString(value: unknown, options: { allowNull: true; allowUndefined: true }): value is string | null | undefined;
export function isNonEmptyString(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is string | null;
export function isNonEmptyString(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is string | undefined;
export function isNonEmptyString(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is string;
export function isNonEmptyString(value: unknown, options?: ValidationOptions): value is string | null | undefined {
    return (typeof value === 'string' && value.trim().length > 0) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

// UUID validation (supports v1-v5)
export function isValidUUID(value: unknown, options: { allowNull: true; allowUndefined: true }): value is string | null | undefined;
export function isValidUUID(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is string | null;
export function isValidUUID(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is string | undefined;
export function isValidUUID(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is string;
export function isValidUUID(value: unknown, options?: ValidationOptions): value is string | null | undefined {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return (typeof value === 'string' && uuidRegex.test(value)) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}

// ISO 8601 date string validation
export function isValidISOString(value: unknown, options: { allowNull: true; allowUndefined: true }): value is string | null | undefined;
export function isValidISOString(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is string | null;
export function isValidISOString(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is string | undefined;
export function isValidISOString(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is string;
export function isValidISOString(value: unknown, options?: ValidationOptions): value is string | null | undefined {
    if (typeof value !== 'string') {
        return Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
    }

    try {
        const date = new Date(value);
        return date.toISOString() === value && !isNaN(date.getTime());
    } catch {
        return false;
    }
}

// Timezone validation using Intl.supportedValuesOf (available in modern browsers/Node)
export function isValidTimezone(value: unknown, options: { allowNull: true; allowUndefined: true }): value is string | null | undefined;
export function isValidTimezone(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is string | null;
export function isValidTimezone(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is string | undefined;
export function isValidTimezone(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is string;
export function isValidTimezone(value: unknown, options?: ValidationOptions): value is string | null | undefined {
    if (typeof value !== 'string') {
        return Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
    }
    try {
        // Use Intl.DateTimeFormat to validate timezone
        new Intl.DateTimeFormat('en-US', { timeZone: value });
        return true;
    } catch {
        return false;
    }
}

export function isValidEventType(value: unknown, options: { allowNull: true; allowUndefined: true }): value is EventType | null | undefined;
export function isValidEventType(value: unknown, options: { allowNull: true; allowUndefined?: false }): value is EventType | null;
export function isValidEventType(value: unknown, options: { allowNull?: false; allowUndefined: true }): value is EventType | undefined;
export function isValidEventType(value: unknown, options?: { allowNull?: false; allowUndefined?: false }): value is EventType;
export function isValidEventType(value: unknown, options?: ValidationOptions): value is EventType | null | undefined {
    return (typeof value === 'string' && EventType[value as EventType] != null) || Boolean(options?.allowNull && value === null) || Boolean(options?.allowUndefined && value === undefined);
}
