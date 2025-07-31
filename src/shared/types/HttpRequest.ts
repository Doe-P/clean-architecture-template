import { AxiosRequestConfig } from "axios";

export type IHttpRequest = {
    url: string;
    config?: AxiosRequestConfig;
    data?: unknown;
}