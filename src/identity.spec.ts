import { Identity } from './identity';

describe('Identity', () => {
  it('should create monade', () => {
    const result = Identity(1);
    expect(result instanceof Identity).toBeTruthy();
  });
  it('join should return the value', () => {
    const result = Identity(1).join();
    expect(result).toBe(1);
  });
  it('map should return new instance', () => {
    const monad = Identity(1);
    const result = monad.map(x=>x+1);
    expect(result).not.toBe(monad);
    expect(result instanceof Identity).toBeTruthy();
    expect(result.join()).toBe(2);
  });
  it('should have inspect', () => {
    const result = Identity(1);
    expect(result.inspect()).toBe('Identity(1)');
  });
  it('chain should return new monad', () => {
    const monad = Identity(1);
    const result = monad.chain(Identity);
    expect(result).not.toBe(monad);
    expect(result instanceof Identity).toBeTruthy();
    expect(result.join()).toBe(1);
  });

});

