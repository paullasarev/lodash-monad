
export type MapFunc<T> = (arg: T) => T;

export interface Functor<T> {
  map(func: MapFunc<T>): Functor<T>;
}

export interface Extend<T> {
  extend(f: (w: Extend<T>) => T): Extend<T>;
}

export interface Extract<T> {
  extract: () => T;
}

export type ChainFunc<T, R> = (arg: T) => R;

export interface Monad<T> extends Functor<T> {
  chain<U>(func: ChainFunc<T, Monad<U>>): Monad<U>;
}

export interface Comonad<T> extends Monad<T>, Extract<T> {
}
