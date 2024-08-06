import { HttpClient } from "@utils/fetch/HttpClient";
import { HttpRequest, HttpResponse } from "@utils/fetch/types";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class UseAxiosAdapter<T = any> extends HttpClient<T, AxiosInstance, AxiosResponse<T>> {

    constructor(API_URL: string) {
        super();
        this.client = axios.create({
            baseURL: API_URL,
        });
        this.loading = false;
    }

    async request(data: HttpRequest): Promise<HttpResponse<T>> {
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