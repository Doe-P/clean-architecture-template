
export type Result<L, R> = Left<L> | Right<R>;

export type AsyncResult<L, R> = Promise<Result<L, R>>

export class Left<L> {
    readonly tag = "Left";

    constructor(readonly value: L) { }

    isLeft(): this is Left<L> {
        return true;
    }

    isRight(): this is Right<unknown>{
        return false;
    }
}


export class Right<R>{
    readonly tag = "Right";

    constructor(readonly value: R) { }

    isLeft(): this is Left<unknown>{
        return false;
    }

    isRight(): this is Right < R > {
        return true;
    }
}

export const left = <L, R = never>(value: L): Result<L, R> => new Left(value);

export const right = <R, L = never,>(value: R): Result<L, R> => new Right(value);