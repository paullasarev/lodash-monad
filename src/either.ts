import { Func } from './types';
import { Identity } from './identity';

export class Either<T> extends Identity<T> {

  protected error: Error | null = null;

  constructor (value: T) {
    super(value);
  }

  type() { return Either };

  // Applicative
  static of<T>(value: T) {
    return new Either<T>(value);
  }

}
