import { HttpStatusCode } from "../types";

export type FetchReturns<T = any> = {
    status: HttpStatusCode,
    body: T,
    loading: boolean,
    error: string,
    isSuccess: boolean
}

export abstract class AbstractUseFetch<T = any>{
    body?: T;
    status?: HttpStatusCode;
    error?: string;
    loading?: boolean;
    isSuccess?: boolean;

    abstract useFetch(): Promise<FetchReturns<T>>;

    setBody(body: T | undefined): void {
        this.body = body;
    }

    setError(error: string): void {
        this.error = error;
    }

    setLoading(loading: boolean): void {
        this.loading = loading;
    }

    setStatus(status: HttpStatusCode | undefined): void {
        this.status = status;
    }

    setIsSuccess(isSuccess: boolean): void {
        this.isSuccess = isSuccess;
    }
}    