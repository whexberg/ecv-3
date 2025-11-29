export type ErrMessage = string;

export class Success<T = unknown> {
    readonly _tag = 'success';
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    public readonly isSuccess: true = true as const;
    public readonly isFailure: false = false as const;
}

export class Failure<E = ErrMessage> {
    readonly _tag = 'failure';
    error: E;

    constructor(error: E) {
        this.error = error;
    }

    public readonly isSuccess: false = false as const;
    public readonly isFailure: true = true as const;
}

export type Result<T, E = ErrMessage> = Success<T> | Failure<E>;
export type AsyncResult<T, E = ErrMessage> = Promise<Result<T, E>>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
    export const failure = <E = ErrMessage>(e: E): Failure<E> => new Failure(e);
    export const success = <T = unknown>(t: T): Success<T> => new Success(t);

    export const isResult = <T = unknown, E = unknown>(r: unknown): r is Result<T, E> => {
        if (r instanceof Failure || r instanceof Success) return true;
        if (typeof r !== 'object' || r == null) return false;
        if (!('_tag' in r)) return false;
        if (Object.keys(r).length !== 4 && Object.keys(r).length !== 2) return false;
        return 'value' in r || 'error' in r;
    };

    export const isFailure = <T = never, E = ErrMessage>(r: Result<T, E>): r is Failure<E> => r._tag === 'failure';
    export const isSuccess = <T = unknown, E = ErrMessage>(r: Result<T, E>): r is Success<T> => r._tag === 'success';
}
