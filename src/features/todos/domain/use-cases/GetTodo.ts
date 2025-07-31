import { AsyncResult } from "@/shared/result/Result";
import { TodoRepository } from "../interface/TodoRepository";
import { AppError } from "@/shared/errors/AppError";
import { ITodo } from "../entities/Todo";

export class GetTodo {
    constructor(private repo: TodoRepository) { }

    async execute(): AsyncResult<AppError, ITodo[]>{
        return await this.repo.getAll();
    }
}