import { AppError } from "@/shared/errors/AppError";
import { AsyncResult, right } from "@/shared/result/Result";
import { ITodo } from "../domain/entities/Todo";
import { TodoRepository } from "../domain/interface/TodoRepository";
import { HttpService } from "@/shared/network/NetworkService";

export class TodoApiRepository implements TodoRepository {
  constructor(private http: HttpService) {}

  async getAll(): AsyncResult<AppError, ITodo[]> {
    return await this.http.get<ITodo[]>({ url: "/todos" });
  }
}
