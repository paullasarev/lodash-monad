
export class Just {
  private value: any;

  constructor (value: any) {
    this.value = value;
  }
  static of(value: any) {
    return new Just(value);
  }
}
