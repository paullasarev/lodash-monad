import { MapFunc, ChainFunc, Monad } from "./types";

export class IdentityMonad<T> implements Monad {
  private value: T;

  constructor (value: T) {
    this.value = value;
  }

  inspect() {
    return `Identity(${this.value})`;
  }

  // due to TS limitations it's impossible to template static method
  // static of(value: T) {
  //   return new IdentityMonad(value);
  // }

  join(): T {
    return this.value;
  }

  map(func: MapFunc<T,T>): IdentityMonad<T> {
    return Identity(func(this.value))
  }

  chain(func: ChainFunc<T>) {
    return func(this.value);
  }
}

export function Identity<T>(x: T): IdentityMonad<T> {
  return new IdentityMonad(x);
}

Identity.prototype = IdentityMonad.prototype;


