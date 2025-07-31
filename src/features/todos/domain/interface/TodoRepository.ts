import { AppError } from "@/shared/errors/AppError";
import { AsyncResult } from "@/shared/result/Result";
import { ITodo } from "../entities/Todo";

export interface TodoRepository {
    getAll(): AsyncResult<AppError, ITodo[]>;
}