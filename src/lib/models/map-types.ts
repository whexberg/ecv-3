/* eslint-disable @typescript-eslint/no-explicit-any */

export type SnakeCase<S extends string> = S extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
        ? `${First}${SnakeCaseHelper<Rest>}`
        : `${Lowercase<First>}${SnakeCaseHelper<Rest>}`
    : S;

type SnakeCaseHelper<S extends string> = S extends `${infer First}${infer Second}${infer Rest}`
    ? First extends Lowercase<First>
        ? `${First}${SnakeCaseHelper<`${Second}${Rest}`>}`
        : Second extends Lowercase<Second>
          ? `_${Lowercase<First>}${SnakeCaseHelper<`${Second}${Rest}`>}`
          : `${Lowercase<First>}${SnakeCaseHelper<`${Second}${Rest}`>}`
    : S extends Capitalize<S>
      ? Lowercase<S>
      : S;

type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Serializable<
    DeserializedType,
    SerializedKey extends string | undefined = undefined,
    SerializedType = DeserializedType,
> = {
    __deserializedType: DeserializedType;
    __serializedKey?: SerializedKey;
    __serializedType?: SerializedType;
};

export type Deserialized<T> = Prettify<{ [K in keyof T]: T[K] extends Serializable<infer M, any, any> ? M : never }>;

export type Serialized<T> = Prettify<{
    [K in keyof T as T[K] extends Serializable<any, infer SKey, any>
        ? SKey extends string
            ? SKey
            : SnakeCase<K & string>
        : never]: T[K] extends Serializable<any, any, infer SType> ? SType : never;
}>;
