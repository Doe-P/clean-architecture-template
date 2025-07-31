import { AppError } from "@/shared/errors/AppError";
import { left, Result } from "@/shared/result/Result";
import { ITodoEntity } from "../domain/TodoEntity";
import { ITodoRepository } from "../domain/TodoRepository";
import { HttpService } from "@/shared/network/HttpService";

export class TodoService implements ITodoRepository {

    constructor(private readonly httpService: HttpService) { }

    getTodo(): Result<AppError, ITodoEntity[]> {
     try {
         const response = this.httpService.get<ITodoEntity[]>({
             url: "/todos"
         });
        
         return response.

     } catch (error) {
         throw left(new AppError((error as Error).message));
     }
    }
    
}