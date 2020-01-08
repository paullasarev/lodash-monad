
export type Func<T, R> = (arg: T) => R;

export interface Functor<T> {
  map<U>(func: Func<T,U>): Functor<U>;
}

export interface Apply<T> extends Functor<T> {
  ap<U>(b: Functor<Func<T,U>>): Functor<U>;
}

export interface ApplicableType {
  of<T>(value: T): any;
}

export interface Applicable<T> extends Apply<T> {
  type(): ApplicableType;
}

export interface Monad<T> extends Applicable<T> {
  chain<R>(func: Func<T, R>): R;
}

export interface Extend<T> extends Functor<T> {
  extend(f: (w: Extend<T>) => T): Extend<T>;
}

export interface Comonad<T> extends Monad<T>, Extend<T> {
  extract: () => T;
}
