import { Failure, Result, Success } from './result';

describe('Success', () => {
    it('should create a Success instance with a value', () => {
        const value = 42;
        const success = new Success(value);

        expect(success.value).toBe(value);
        expect(success._tag).toBe('success');
        expect(success.isSuccess).toBe(true);
        expect(success.isFailure).toBe(false);
    });

    it('should handle different value types', () => {
        const stringSuccess = new Success('test');
        const objectSuccess = new Success({ key: 'value' });
        const arraySuccess = new Success([1, 2, 3]);

        expect(stringSuccess.value).toBe('test');
        expect(objectSuccess.value).toEqual({ key: 'value' });
        expect(arraySuccess.value).toEqual([1, 2, 3]);
    });

    it('should handle null and undefined values', () => {
        const nullSuccess = new Success(null);
        const undefinedSuccess = new Success(undefined);

        expect(nullSuccess.value).toBeNull();
        expect(undefinedSuccess.value).toBeUndefined();
    });
});

describe('Failure', () => {
    it('should create a Failure instance with an error', () => {
        const error = new Error('Something went wrong');
        const failure = new Failure(error);

        expect(failure.error).toBe(error);
        expect(failure._tag).toBe('failure');
        expect(failure.isSuccess).toBe(false);
        expect(failure.isFailure).toBe(true);
    });

    it('should handle different error types', () => {
        const stringFailure = new Failure('error message');
        const numberFailure = new Failure(404);
        const objectFailure = new Failure({ code: 'ERR_001' });

        expect(stringFailure.error).toBe('error message');
        expect(numberFailure.error).toBe(404);
        expect(objectFailure.error).toEqual({ code: 'ERR_001' });
    });
});

describe('Result namespace', () => {
    describe('success', () => {
        it('should create a Success instance', () => {
            const result = Result.success(100);

            expect(result).toBeInstanceOf(Success);
            expect(result.value).toBe(100);
            expect(result._tag).toBe('success');
        });
    });

    describe('failure', () => {
        it('should create a Failure instance', () => {
            const error = new Error('Failed');
            const result = Result.failure(error);

            expect(result).toBeInstanceOf(Failure);
            expect(result.error).toBe(error);
            expect(result._tag).toBe('failure');
        });
    });

    describe('isResult', () => {
        it('should return true for Success instances', () => {
            const success = Result.success(42);
            expect(Result.isResult(success)).toBe(true);
        });

        it('should return true for Failure instances', () => {
            const failure = Result.failure(new Error());
            expect(Result.isResult(failure)).toBe(true);
        });

        it('should return false for non-object values', () => {
            expect(Result.isResult(null)).toBe(false);
            expect(Result.isResult(undefined)).toBe(false);
            expect(Result.isResult(42)).toBe(false);
            expect(Result.isResult('string')).toBe(false);
            expect(Result.isResult(true)).toBe(false);
        });

        it('should return false for objects without _tag property', () => {
            expect(Result.isResult({})).toBe(false);
            expect(Result.isResult({ value: 42 })).toBe(false);
            expect(Result.isResult({ error: new Error() })).toBe(false);
        });

        it('should return false for objects with wrong number of keys', () => {
            expect(Result.isResult({ _tag: 'success' })).toBe(false);
            expect(Result.isResult({ _tag: 'success', value: 42, extra: 'key' })).toBe(false);
        });

        it('should return false for objects with _tag but neither value nor error', () => {
            expect(Result.isResult({ _tag: 'success', other: 'prop' })).toBe(false);
        });

        it('should return true for objects that look like Results', () => {
            expect(Result.isResult({ _tag: 'success', value: 42 })).toBe(true);
            expect(Result.isResult({ _tag: 'failure', error: 'err' })).toBe(true);
        });
    });

    describe('isSuccess', () => {
        it('should return true for Success instances', () => {
            const success = Result.success(42);
            expect(Result.isSuccess(success)).toBe(true);
        });

        it('should return false for Failure instances', () => {
            const failure = Result.failure(new Error());
            expect(Result.isSuccess(failure)).toBe(false);
        });

        it('should narrow type correctly', () => {
            const result: Result<number, Error> = Result.success(42);

            if (Result.isSuccess(result)) {
                // TypeScript should know this is Success<number>
                expect(result.value).toBe(42);
            }
        });
    });

    describe('isFailure', () => {
        it('should return true for Failure instances', () => {
            const failure = Result.failure(new Error('error'));
            expect(Result.isFailure(failure)).toBe(true);
        });

        it('should return false for Success instances', () => {
            const success = Result.success(42);
            expect(Result.isFailure(success)).toBe(false);
        });

        it('should narrow type correctly', () => {
            const result: Result<number, Error> = Result.failure(new Error('oops'));

            if (Result.isFailure(result)) {
                // TypeScript should know this is Failure<Error>
                expect(result.error.message).toBe('oops');
            }
        });
    });
});

describe('Result type integration', () => {
    it('should work in a practical scenario with type guards', () => {
        const divide = (a: number, b: number): Result<number, string> => {
            if (b === 0) {
                return Result.failure('Cannot divide by zero');
            }
            return Result.success(a / b);
        };

        const successResult = divide(10, 2);
        expect(Result.isSuccess(successResult)).toBe(true);
        if (Result.isSuccess(successResult)) {
            expect(successResult.value).toBe(5);
        }

        const failureResult = divide(10, 0);
        expect(Result.isFailure(failureResult)).toBe(true);
        if (Result.isFailure(failureResult)) {
            expect(failureResult.error).toBe('Cannot divide by zero');
        }
    });

    it('should distinguish between Success and Failure using _tag', () => {
        const results: Result<number, string>[] = [Result.success(1), Result.failure('error'), Result.success(2)];

        const successes = results.filter((r) => r._tag === 'success');
        const failures = results.filter((r) => r._tag === 'failure');

        expect(successes).toHaveLength(2);
        expect(failures).toHaveLength(1);
    });

    it('should use instance properties for type checking', () => {
        const result = Result.success(42);

        expect(result.isSuccess).toBe(true);
        expect(result.isFailure).toBe(false);

        const failure = Result.failure('error');
        expect(failure.isSuccess).toBe(false);
        expect(failure.isFailure).toBe(true);
    });
});
