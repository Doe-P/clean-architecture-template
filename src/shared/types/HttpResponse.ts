export interface IHttpResponse<T>{
    success: boolean;
    message: string;
    data: T;
    errors: unknown;
}