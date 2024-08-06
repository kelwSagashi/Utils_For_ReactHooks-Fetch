
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { HttpClient } from "../../HttpClient";
import { HttpRequest, HttpResponse } from "../../types";

export class UseAxiosAdapter<T = unknown> extends HttpClient<T, AxiosInstance, AxiosResponse<T>> {

    constructor(API_URL: string) {
        super();
        this.client = axios.create({
            baseURL: API_URL,
        });
        this.loading = false;
    }

    async request(data: HttpRequest): Promise<HttpResponse<T>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            this.loading = true;
            try {
                // const controller = new AbortController();
                this.response = await this.client({
                    url: data.endpoint,
                    method: data.method,
                    headers: data.headers,
                    data: data.body,
                    params: data.query,
                    // signal: controller?.signal,
                });
            } catch (error) {
                this.error = (error as Error).message;
                reject(error as Error);
            } finally {
                this.loading = false;
            }

            resolve({
                statusCode: this.response?.status,
                body: this.response?.data,
                error: undefined,
            })
        })
    }
}