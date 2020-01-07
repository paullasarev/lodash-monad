import { Identity } from './identity';

describe('Identity', () => {
  it('of should create monade', () => {
    const result = Identity.of(1);
    expect(result instanceof Identity).toBeTruthy();
  });
  it('of should have constructor', () => {
    const result = Identity.of(1);
    expect(result.constructor.of).toBeInstanceOf(Function);
  });
  it('extract should return the value', () => {
    const result = Identity.of(1).extract();
    expect(result).toBe(1);
  });
  it('extend should create identity', () => {
    const monad = Identity.of(1);
    const result = monad.extend(w=>w.extract()+1);
    expect(result instanceof Identity).toBeTruthy();
    expect(result.extract()).toBe(2);
  });
  it('map should return new instance', () => {
    const monad = Identity.of(1);
    const result = monad.map(x=>x+1);
    expect(result).not.toBe(monad);
    expect(result instanceof Identity).toBeTruthy();
    expect(result.extract()).toBe(2);
  });
  it('should have inspect', () => {
    const result = Identity.of(1);
    expect(result.inspect()).toBe('Identity.of(1)');
  });
  it('chain should return new monad', () => {
    const monad = Identity.of(1);
    const result = monad.chain(Identity.of);
    expect(result).not.toBe(monad);
    expect(result instanceof Identity).toBeTruthy();
    expect(result.extract()).toBe(1);
  });

});

