import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AppError, HttpError, ParseError } from "../errors/AppError";
import { AsyncResult, left, right } from "../result/Result";
import { IHttpRequest } from "../types/HttpRequest";

export interface IHttpService {
  get<T>(
    request: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T>;

  post<T>(
    request: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T>;

  patch<T>(
    request: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T>;

  delete<T>(
    request: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T>;

  setHeader(header: AxiosRequestHeaders): void;
}

export class HttpService implements IHttpService {
  private readonly axiosService: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosService = axios.create({
      baseURL: baseURL ?? "",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async get<T>(
    { url, config }: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T> {
    try {
      const response = await this.axiosService.get<T>(url, config);
      return right(this._safeParse(response.data, parser));
    } catch (error) {
      return left(this._toAppError(error));
    }
  }
  async post<T>(
    { url, data, config }: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T> {
    try {
      const response = await this.axiosService.post<T>(url, data, config);
      return right(this._safeParse(response.data, parser));
    } catch (error) {
      return left(this._toAppError(error));
    }
  }
  async patch<T>(
    { url, data, config }: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T> {
    try {
      const response = await this.axiosService.patch<T>(url, data, config);
      return right(this._safeParse(response.data, parser));
    } catch (error) {
      return left(this._toAppError(error));
    }
  }
  async delete<T>(
    { url, config }: IHttpRequest,
    parser?: (data: unknown) => T
  ): AsyncResult<AppError, T> {
    try {
      const response = await this.axiosService.delete<T>(url, config);
      return right(this._safeParse(response.data, parser));
    } catch (error) {
      return left(this._toAppError(error));
    }
  }
  setHeader(header: AxiosRequestHeaders): void {
    const newHeader = {
      ...header,
      ...axios.AxiosHeaders,
    } as unknown as InternalAxiosRequestConfig;
    this._handleRequest(newHeader);
  }

  private _initializeRequestInterceptor() {
    this.axiosService.interceptors.request.use(this._handleRequest);
  }

  private _initializeResponseInterceptor() {
    // You may want to implement a response handler here in the future
    this.axiosService.interceptors.response.use(this._handleResponse);
  }

  private _handleRequest(
    config?: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    return {
      ...config,
    } as InternalAxiosRequestConfig;
  }

  private _handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private _isAxiosError(error: Error): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }

  private _safeParse<T>(data: unknown, parser?: (data: unknown) => T): T {
    if (!parser) return data as T;
    try {
      return parser(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new ParseError(e.message);
      }
      throw new ParseError(String(e));
    }
  }

  private _toAppError(error: AxiosError | unknown): AppError {
    if (axios.isAxiosError(error)) {
      return new HttpError(error.status ?? 500, error.message);
    }
    return new AppError("Unknown error occurred");
  }
}
