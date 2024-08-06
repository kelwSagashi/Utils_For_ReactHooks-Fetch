type ContentType =   
"application/java-archive" | 
"application/EDI-X12" | 
"application/EDIFACT"   | 
"application/octet-stream" | 
"application/ogg" | 
"application/pdf" | 
"application/xhtml+xml"    | 
"application/x-shockwave-flash"     | 
"application/json" | 
"application/ld+json"   | 
"application/xml" | 
"application/zip"  | 
"application/x-www-form-urlencoded" |
"audio/mpeg" |
"audio/x-ms-wma" |
"audio/vnd.rn-realaudio" |
"audio/x-wav" |
"image/gif" |
"image/jpeg" |
"image/png" |
"image/tiff" |
"image/vnd.microsoft.icon" |
"image/x-icon" |
"image/vnd.djvu" |
"image/svg+xml" |
"multipart/mixed" |
"multipart/alternative" |
"multipart/related" |
"multipart/form-data" |
"text/css" |
"text/csv" |
"text/html" |
"text/javascript" |
"text/plain" |
"text/xml" |
"video/mpeg" |
"video/mp4" |
"video/quicktime" |
"video/x-ms-wmv" |
"video/x-msvideo" |
"video/x-flv" |
"video/webm" |
"application/vnd.android.package-archive" |
"application/vnd.oasis.opendocument.text" |
"application/vnd.oasis.opendocument.spreadsheet" |
"application/vnd.oasis.opendocument.presentation" |
"application/vnd.oasis.opendocument.graphics" |
"application/vnd.ms-excel" |
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" |
"application/vnd.ms-powerpoint" |
"application/vnd.openxmlformats-officedocument.presentationml.presentation" |
"application/msword" |
"application/vnd.openxmlformats-officedocument.wordprocessingml.document" |
"application/vnd.mozilla.xul+xml";

type ContentConnection = "keep-alive" | "close" | "Keep-Alive";

interface IncomingHttpHeaders {
    'Content-Type'?: ContentType;
    'Connection'?: ContentConnection | string;
    'Content-Encoding'?: string;
    'Date'?: string;
    'Keep-Alive'?: string;
    'Server'?: string;
    [x: string]: string | any;
}

export type HttpMethod = "get" | "post" | "put" | "delete";

type Query = {
    [key: string]: string 
}

export type HttpRequest = {
    endpoint?: string;
    method?: HttpMethod;
    headers?: IncomingHttpHeaders;
    body?: any;
    query?: Query;
};

export enum HttpStatusCode {
    ok = 200,
    created = 201,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    preconditionFailed = 412,
    serverError = 500
};

export type HttpResponse<T = any> = {
    statusCode?: number;
    body?: T;
    error?: string;
};