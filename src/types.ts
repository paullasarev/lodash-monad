
export type Func<T, R> = (arg: T) => R;

export interface Functor<T> {
  map(func: Func<T,T>): Functor<T>;
}

export interface Extend<T> {
  extend(f: (w: Extend<T>) => T): Extend<T>;
}

export interface Extract<T> {
  extract: () => T;
}

export interface Monad<T> extends Functor<T> {
  chain<U, R extends Monad<U>>(func: Func<T, R>): R;
}

export interface Comonad<T> extends Monad<T>, Extend<T>, Extract<T> {
}
