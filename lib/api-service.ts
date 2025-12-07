import { AsyncResult, Result } from '@/lib/result';

export type ApiError = {
    endpoint: string;
    message: string;
    status: number;
};

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '';

export class ApiService {
    protected baseUrl: string;

    protected constructor(baseUrl = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    protected async GET<T>(endpoint: string): AsyncResult<T, ApiError> {
        return this.makeRequest<T>(endpoint, { method: 'GET' });
    }

    protected async POST<T>(endpoint: string, body?: string): AsyncResult<T, ApiError> {
        return this.makeRequest<T>(endpoint, { method: 'POST', body });
    }

    protected async PUT<T>(endpoint: string, body?: string): AsyncResult<T, ApiError> {
        return this.makeRequest<T>(endpoint, { method: 'PUT', body });
    }

    protected async PATCH<T>(endpoint: string, body?: string): AsyncResult<T, ApiError> {
        return this.makeRequest<T>(endpoint, { method: 'PATCH', body });
    }

    protected async DELETE<T>(endpoint: string): AsyncResult<T, ApiError> {
        return this.makeRequest<T>(endpoint, { method: 'DELETE' });
    }

    protected async makeRequest<T>(endpoint: string, options: RequestInit = {}): AsyncResult<T, ApiError> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            const data = await response.json();

            if (!response.ok) {
                return Result.failure<ApiError>({
                    message: data.error || 'Unknown error occurred',
                    status: response.status,
                    endpoint,
                });
            }

            return Result.success(data);
        } catch (error) {
            return Result.failure<ApiError>({
                message: error instanceof Error ? error.message : 'Network error occurred',
                status: 0,
                endpoint,
            });
        }
    }
}
