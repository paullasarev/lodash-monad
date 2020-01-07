import { Identity } from './identity';
import { Func } from './types';

describe('Identity', () => {

  describe('of', () => {
    it('should create monade', () => {
      const result = Identity.of(1);
      expect(result instanceof Identity).toBeTruthy();
    });
    it('should be accessible via constructor', () => {
      const result = Identity.of(1);
      expect(result.constructor.of).toBeInstanceOf(Function);
    });
  });

  describe('extract|extend', () => {
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
    it('extend/extract should be left identity', () => {
      const w = Identity.of(1);
      const f = (w: Identity<number>) => w.extract();
      expect(w.extend(f)).toEqual(w);
    });
    it('extend/extract should be right identity', () => {
      const w = Identity.of(1);
      const f = (w: Identity<number>) => w.extract();
      expect(w.extend(f).extract()).toEqual(f(w));
    });
  });

  describe('map', () => {
    it('should return new instance', () => {
      const monad = Identity.of(1);
      const result = monad.map(x=>x+1);
      expect(result).not.toBe(monad);
      expect(result instanceof Identity).toBeTruthy();
      expect(result.extract()).toBe(2);
    });
  });

  describe('chain', () => {
    it('should return new monad', () => {
      const monad = Identity.of(1);
      const result = monad.chain<number, Identity<number>>(Identity.of);
      expect(result).not.toBe(monad);
      expect(result instanceof Identity).toBeTruthy();
      expect(result.extract()).toBe(1);
    });
  });

  describe('inspect', () => {
    it('should describe content', () => {
      const result = Identity.of(1);
      expect(result.inspect()).toBe('Identity.of(1)');
    });
  });

  describe('ap', () => {
    it('should apply applicative functor', () => {
      const a = Identity.of(1);
      const b = Identity.of(1).map(a => (b: number) => a + b);
      const result = a.ap(b);
      expect(result).toEqual(Identity.of(2));
    });
    it('should be composable', () => {
      // https://github.com/fantasyland/fantasy-land#apply
      // v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x)))))
      // is equivalent to
      // v['fantasy-land/ap'](u)['fantasy-land/ap'](a)
      // (composition)
      const v = Identity.of(1);
      const u = Identity.of((b: number) => 1 + b);
      const a = Identity.of((b: number) => 3 + b);
      const result1 = v.ap(u.ap(a.map((f:Func<number,number>) => (g:Func<number,number>) => (x:number) => f(g(x)))));
      const result2 = v.ap(u).ap(a);
      expect(result1).toEqual(result2);
      expect(result1).toEqual(Identity.of(5));
    });
  });

  describe('aplicative', () => {
    it('should apply identity', () => {
      // v['fantasy-land/ap'](A['fantasy-land/of'](x => x)) is equivalent to v (identity)
      const v = Identity.of(1);
      const result = v.ap(Identity.of((x:number)=>x));
      expect(result).toEqual(v);
    });
    it('should apply homomorphism', () => {
      // A['fantasy-land/of'](x)['fantasy-land/ap'](A['fantasy-land/of'](f))
      // is equivalent to
      // A['fantasy-land/of'](f(x))
      // (homomorphism)
      const x = 1;
      const f = (x:number) => x;
      const result1 = Identity.of(x).ap(Identity.of(f));
      const result2 = Identity.of(f(x));
      expect(result1).toEqual(result2);
    });
    it('should apply interchange', () => {
      // A['fantasy-land/of'](y)['fantasy-land/ap'](u)
      // is equivalent to
      // u['fantasy-land/ap'](A['fantasy-land/of'](f => f(y)))
      // (interchange)
      const y = 1;
      const u = Identity.of((b: number) => 1 + b);
      const f = (x:number) => x;
      const result1 = Identity.of(y).ap(u);
      const result2 = u.ap(Identity.of(f=>f(y)));
      expect(result1).toEqual(result2);
    });
  });
});

