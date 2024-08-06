import { AbstractUseFetch, FetchReturns } from "../Base";
import { HttpClient } from "../HttpClient";
import { HttpRequest } from "../types";

export class UseFetch<T = any> extends AbstractUseFetch<T> {
    httpClient: HttpClient<any, any, any>;
    request: HttpRequest;

    constructor(httpClient: HttpClient<any, any, any>, request: HttpRequest) {
        super();
        this.request = request;
        this.httpClient = httpClient;
        this.loading = false;
        this.isSuccess = false;
    }

    async useFetch(request?: HttpRequest): Promise<FetchReturns<T>> {
        this.request = { ...request, ...this.request };
        this.setLoading(true);
        
        try {
            const {
                statusCode,
                body
            } = await this.httpClient.request(this.request);
            this.setBody(body);
            this.setStatus(statusCode);
            this.setIsSuccess(true);
        } catch (error) {
            this.setError((error as Error).message);
        } finally {
            this.setLoading(false);
        }

        return {
            status: this.status,
            body: this.body,
            loading: this.loading,
            error: this.error,
            isSuccess: this.isSuccess
        };
    }
}