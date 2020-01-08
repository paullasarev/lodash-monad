import { Func, Comonad, Monad } from "./types";

export class Identity<T> implements Comonad<T> {
  private value: T;

  type() { return Identity };

  constructor (value: T) {
    this.value = value;
  }

  inspect() {
    return `Identity.of(${this.value})`;
  }

  // Applicative
  static of<T>(value: T) {
    return new Identity<T>(value);
  }

  // Functor
  map<U>(func: Func<T,U>): Identity<U> {
    return Identity.of(func(this.value));
  }

  // Apply
  ap<U>(b: Identity<Func<T,U>>): Identity<U> {
    return Identity.of(b.value(this.value));
  }

  // Chain
  chain<R>(func: Func<T, R>): R {
    return func(this.value);
  }

  // Extend
  extend(f: (w: Identity<T>) => T): Identity<T> {
    return Identity.of(f(this));
  }

  // Comonad
  extract(): T {
    return this.value;
  }
}



