import { Func, Comonad, Monad } from "./types";

export class Identity<T> implements Comonad<T> {
  private value: T;

  // to keep typed access to static members via instance.constructor.prop
  // see https://github.com/Microsoft/TypeScript/issues/3841
  // ['constructor']: typeof Identity;
  // ['constructor']!: typeof Identity;

  constructor (value: T) {
    this.value = value;
  }

  inspect() {
    return `Identity.of(${this.value})`;
  }

  static of<T>(value: T) {
    return new Identity<T>(value);
  }

  extend(f: (w: Identity<T>) => T): Identity<T> {
    return Identity.of(f(this));
  }

  extract(): T {
    return this.value;
  }

  map<U>(func: Func<T,U>): Identity<U> {
    return Identity.of(func(this.value));
  }

  ap<U>(b: Identity<Func<T,U>>): Identity<U> {
    return Identity.of(b.value(this.value));
  }

  chain<U, R extends Monad<U>>(func: Func<T, R>): R {
    return func(this.value);
  }
}



