import { Result } from '@/shared/result/Result';
import { AppError } from '@/shared/errors/AppError';
import { ITodoEntity } from './TodoEntity';

export interface ITodoRepository {
    getTodo(): Result<AppError, ITodoEntity[]>;
}