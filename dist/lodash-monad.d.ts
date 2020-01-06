declare type MapFunc<A, R> = (arg: A) => R;
interface Monad {
    map: (func: MapFunc<any, any>) => Monad;
    chain: (func: ChainFunc<any>) => Monad;
    join: () => any;
}
declare type ChainFunc<A> = (arg: A) => Monad;

declare class IdentityMonad<T> implements Monad {
    private value;
    constructor(value: T);
    inspect(): string;
    join(): T;
    map(func: MapFunc<T, T>): IdentityMonad<T>;
    chain(func: ChainFunc<T>): Monad;
}
declare function Identity<T>(x: T): IdentityMonad<T>;
declare namespace Identity {
    var prototype: IdentityMonad<any>;
}

declare class Just {
    private value;
    constructor(value: any);
    static of(value: any): Just;
}

export { ChainFunc, Identity, IdentityMonad, Just, MapFunc, Monad };
