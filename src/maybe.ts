import { Func, Monad } from './types';
import { Identity } from './identity';

export class Maybe<T> extends Identity<T> {

  constructor (pValue: T) {
    const value = pValue === undefined ? null as any as T : pValue; 
    super(value);
  }

  // Applicative
  static of<T>(value: T) {
    return new Maybe<T>(value);
  }

  // Functor
  map<U>(func: Func<T,U>): Maybe<U> {
    if (this.isNull) {
      return Maybe.of<U>(null as any as U);
    }
    return Maybe.of(func(this.value));
  }

  // Apply
  ap<U>(b: Maybe<Func<T,U>>): Maybe<U> {
    return Maybe.of(b.value(this.value));
  }

  // Extend
  extend(f: (w: Maybe<T>) => T): Maybe<T> {
    return Maybe.of(f(this));
  }

  // Maybe
  public get isNull() {
    return this.value === null;
  }

  getOrElse(defValue?: T): T {
    return this.isNull ? defValue as T : this.value;
  }

}
