
export type Func<T, R> = (arg: T) => R;

export interface Functor<T> {
  map<U>(func: Func<T,U>): Functor<U>;
}

export interface Apply<T> extends Functor<T> {
  ap<U>(b: Functor<Func<T,U>>): Functor<U>;
}


export interface Monad<T> extends Functor<T>, Apply<T> {
  chain<U, R extends Monad<U>>(func: Func<T, R>): R;
}

export type MonadOf<T, R extends Monad<T>> = (value: T) => R;

export interface Extend<T> extends Functor<T> {
  extend(f: (w: Extend<T>) => T): Extend<T>;
}

export interface Extract<T> {
  extract: () => T;
}

export interface Comonad<T> extends Monad<T>, Extend<T>, Extract<T> {
}
