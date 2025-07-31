import { HttpStatusCode } from "../network/HttpStatusCode";
import { IHttpError } from "../types/HttpError";

export class AppError extends Error {
    public readonly name: string;
    public readonly message: string;
    public readonly stack?: string;

    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
        this.message = message || "Application error occurred";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class HttpError extends AppError implements IHttpError {
  public readonly status: number;

  constructor(statusCode: number, message?: string) {
    super(message ?? HttpStatusCode[statusCode]);
    this.status = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public isClientError(): boolean {
    return this.status >= 400 && this.status <= 499;
  }

  public isServerError(): boolean {
    return this.status >= 500 && this.status <= 599;
  }

  public static fromStatus(status: number, message?: string) {
    return new this(status, message);
  }

  public static fromMessage(message: string, status = 400) {
    return new this(status, message);
  }
}

export class ParseError extends AppError {
    constructor(message?: string) {
        super(message ?? "Parse error");
    }
}

export class ValidationError extends AppError {
    constructor(message?: string) {
        super(message ?? "App validation error");
   }
}

export const isHttpError = (e: Error): e is HttpError => {
  return Number.isInteger((e as HttpError).status);
};