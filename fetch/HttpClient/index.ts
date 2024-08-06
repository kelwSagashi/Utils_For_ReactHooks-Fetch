import { HttpRequest, HttpResponse } from "../types/index";

export abstract class HttpClient<R = any, Instance = any, Response = any> {
    client: Instance;
    response: Response;
    error: string;
    loading: boolean;
    abstract request(data: HttpRequest): Promise<HttpResponse<R>>;
};