
export type Result<L, R> = Left<L, R> | Right<R, L>;

export type AsyncResult<L, R> = Promise<Result<L, R>>

export class Left<L, R> {
  readonly tag = "Left";

  constructor(private readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<unknown, unknown> {
    return false;
  }

  fold<A>(_ok: (r: R) => A, err: (l: L) => A): A {
    return err(this.value);
  }
}


export class Right<L, R>{
    readonly tag = "Right";

    constructor(private readonly value: R) { }

    isLeft(): this is Left<L, R>{
        return false;
    }

    isRight(): this is Right<L, R> {
        return true;
    }

    fold<A>(ok: (r: R) => A, _err: (l: L) => A): A {
      return ok(this.value);
    }
}

export const left = <L, R = never>(value: L): Result<L, R> => new Left(value);

export const right = <R, L = never>(value: R): Result<L, R> => new Right(value);