declare type Func<T, R> = (arg: T) => R;
interface Functor<T> {
    map<U>(func: Func<T, U>): Functor<U>;
}
interface Apply<T> extends Functor<T> {
    ap<U>(b: Functor<Func<T, U>>): Functor<U>;
}
interface ApplicableType {
    of<T>(value: T): any;
}
interface Applicable<T> extends Apply<T> {
    type(): ApplicableType;
}
interface Monad<T> extends Applicable<T> {
    chain<R>(func: Func<T, R>): R;
}
interface Extend<T> extends Functor<T> {
    extend(f: (w: Extend<T>) => T): Extend<T>;
}
interface Comonad<T> extends Monad<T>, Extend<T> {
    extract: () => T;
}

declare class Identity<T> implements Comonad<T> {
    private value;
    type(): typeof Identity;
    constructor(value: T);
    inspect(): string;
    static of<T>(value: T): Identity<T>;
    map<U>(func: Func<T, U>): Identity<U>;
    ap<U>(b: Identity<Func<T, U>>): Identity<U>;
    chain<R>(func: Func<T, R>): R;
    extend(f: (w: Identity<T>) => T): Identity<T>;
    extract(): T;
}

declare class Just {
    private value;
    constructor(value: any);
    static of(value: any): Just;
}

export { Applicable, ApplicableType, Apply, Comonad, Extend, Func, Functor, Identity, Just, Monad };
