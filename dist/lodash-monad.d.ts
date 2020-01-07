declare type Func<T, R> = (arg: T) => R;
interface Functor<T> {
    map<U>(func: Func<T, U>): Functor<U>;
}
interface Apply<T> extends Functor<T> {
    ap<U>(b: Functor<Func<T, U>>): Functor<U>;
}
interface Monad<T> extends Functor<T>, Apply<T> {
    chain<U, R extends Monad<U>>(func: Func<T, R>): R;
}
declare type MonadOf<T, R extends Monad<T>> = (value: T) => R;
interface Extend<T> extends Functor<T> {
    extend(f: (w: Extend<T>) => T): Extend<T>;
}
interface Extract<T> {
    extract: () => T;
}
interface Comonad<T> extends Monad<T>, Extend<T>, Extract<T> {
}

declare class Identity<T> implements Comonad<T> {
    private value;
    constructor(value: T);
    inspect(): string;
    static of<T>(value: T): Identity<T>;
    extend(f: (w: Identity<T>) => T): Identity<T>;
    extract(): T;
    map<U>(func: Func<T, U>): Identity<U>;
    ap<U>(b: Identity<Func<T, U>>): Identity<U>;
    chain<U, R extends Monad<U>>(func: Func<T, R>): R;
}

declare class Just {
    private value;
    constructor(value: any);
    static of(value: any): Just;
}

export { Apply, Comonad, Extend, Extract, Func, Functor, Identity, Just, Monad, MonadOf };
