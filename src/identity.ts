import { MapFunc, ChainFunc, Comonad } from "./types";

export class Identity<T> implements Comonad<T> {
  private value: T;

  // to keep typed access to static members via instance.constructor.prop
  // see https://github.com/Microsoft/TypeScript/issues/3841
  ['constructor']: typeof Identity;

  constructor (value: T) {
    this.value = value;
  }

  inspect() {
    return `Identity.of(${this.value})`;
  }

  static of<T>(value: T) {
    return new Identity(value);
  }

  extract(): T {
    return this.value;
  }

  map(func: MapFunc<T>): Identity<T> {
    return Identity.of(func(this.value));
  }

  chain<U>(func: ChainFunc<T, Comonad<U>>): Comonad<U> {
    return func(this.value);
  }
}



